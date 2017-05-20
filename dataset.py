#!/usr/bin/env python
# coding=utf-8
from random import randint
from pymongo import MongoClient
client = MongoClient('mongodb://localhost:27017/colmena')
db = client.bartolo
collection = db.pussy


for x in range(0, 10):
    ano = randint(2015, 2017)
    mes = randint(1,12)
    dia = randint(1,31)
    collection.insert({
        "importe" : "1",
        "usada": "false",
        "fecha": {
            "anyo": ano,
            "mes": mes,
            "dia": dia
        },
        "idDonacion": x
    })
