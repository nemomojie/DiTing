#Environment
install python3 and pipenv
https://pypi.python.org/pypi/pipenv
 
Then run `pipenv install`
#Usage
Check <a href="https://doc.scrapy.org/en/1.5/intro/overview.html">How to use Scrapy</a>
```commandline
scrapy crawl spider_name -o output_name.jl
```
#Insert to mongodb
Setting about mongo
```python
# mongo.py
MONGO_HOST = 'mongodb://localhost:27017/'
MONGO_DB = 'di-ting'
MONGO_COLLECTION = 'article'
```
Then run `python3 insert.py`
 
All json lines files will be inserted to mongodb