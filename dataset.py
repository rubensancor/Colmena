#!/usr/bin/env python
# coding=utf-8
from random import randint
from pymongo import MongoClient
import random
client = MongoClient('mongodb://localhost:27017/colmena')
db = client.colmena
collection = db.donaciones


for x in range(0, 10000):
    anyo = randint(2010,2017)
    mes = randint(1,12)
    dia = randint(1,31)
    provincia = ['La Coruña','Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Islas Baleares','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','Cuenca','Girona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Jaén','La Rioja','Las Palmas','León','Lleida','Lugo','Madrid','Málaga','Murcia','Navarra','Orense','Palencia','Pontevedra','Salamanca','Segovia','Sevilla','Soria','Tarragona','Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza']
    collection.insert({
        "importe" : "1",
        "usada": "false",
        "fecha": {
            "anyo": anyo,
            "mes": "%02d" % (mes),
            "dia": "%02d" % (dia)
        },
        "provincia": random.choice(provincia),
        "idDonacion": x
    })
