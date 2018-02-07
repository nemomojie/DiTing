#!/usr/bin/python3
from mongo import *
from pymongo import MongoClient
import json
import os

connection = MongoClient(MONGO_HOST)
db = connection[MONGO_DB]
collection = db[MONGO_COLLECTION]

def insertFile(fileName):
    f = open(fileName, 'r')
    while True:
        line = f.readline()
        if line == '':
            break;
        news = json.loads(line)
        #collection.insert_one(news)
    f.close()

currentPath = os.path.split(os.path.realpath(__file__))[0]
outputPath = os.path.join(currentPath, 'output')
fileList = os.listdir(outputPath)
for fileName in fileList:
    insertFile(os.path.join(outputPath, fileName))
