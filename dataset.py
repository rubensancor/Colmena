#!/usr/bin/env python
# coding=utf-8
from random import randint
from pymongo import MongoClient
client = MongoClient('mongodb://localhost:27017/colmena')
db = client.colmena
collection = db.donaciones


for x in range(0, 3):
    anyo = 2017
    mes = 12
    dia = 2
    collection.insert({
        "importe" : "1",
        "usada": "false",
        "fecha": {
            "anyo": anyo,
            "mes": "%02d" % (mes),
            "dia": "%02d" % (dia)
        },
        "idDonacion": x
    })
