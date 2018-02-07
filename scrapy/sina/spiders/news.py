# -*- coding: utf-8 -*-
import scrapy
import re
from scrapy.loader import ItemLoader
from sina.items import ContentItem

class NewsSpider(scrapy.Spider):
    name = 'news'
    allowed_domains = ['news.sina.com.cn']
    start_urls = ['http://news.sina.com.cn/']
    detail_url_regx = '^http://news\.sina\.com\.cn/(([a-zA-Z0-9])+/)+([0-9]{4}\-[0-9]{2}\-[0-9]{2}){1}/doc.*\.shtml'

    def parse(self, response):
        if re.match(self.detail_url_regx, response.url):
            title = response.css('h1.main-title::text').extract_first()
            if title is None:
                return
            data_source = response.css('div.date-source')
            date_time = data_source.xpath('span//text()').extract_first()
            source = data_source.xpath('a//text()').extract_first()
            whole_content = response.css('div.article-content div.article-content-left')
            content_elem = whole_content.css('div.article')
            content = []
            for detail in content_elem.xpath('child::*'):
                if len(detail.css('div.img_wrapper')) > 0:
                    content.append(self.imgItem(detail))
                elif len(detail.xpath('self::p')) > 0:
                    content.append(self.pItem(detail))
            tag = whole_content.css('div.keywords').xpath('a/text()').extract()
            yield {'title':title, 'date':date_time, 'source':source, 'content':content, 'tag': tag}
        else:
            for a in response.css('li a'):
                target = a.xpath('@href').extract_first()
                if re.match(self.detail_url_regx, target):
                    yield response.follow(a, callback=self.parse)

    def imgItem(self, selector):
        c = ItemLoader(ContentItem(), selector)
        c.add_xpath('imgUrl', 'img/@src')
        c.add_xpath('imgAlt', 'span/text()')
        c.add_xpath('imgAlt', 'img/@alt')
        return c.load_item()

    def pItem(self, selector):
        c = ItemLoader(ContentItem(), selector)
        c.add_xpath('content', './text()')
        return c.load_item()