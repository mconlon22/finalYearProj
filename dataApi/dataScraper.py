from selenium import webdriver
import time
from bs4 import BeautifulSoup
import requests





def getCovidDataObject():
    driver = webdriver.Chrome('/Users/martinconlon/Downloads/chromedriver6')
    driver.get("https://covid19ireland-geohive.hub.arcgis.com/")
    time.sleep(8)
    html = driver.page_source
    soup = BeautifulSoup(html,'lxml')
    vals= soup.find_all("span", class_="ss-value")
    dict = {
                "date": vals[0].string,
                "totalPositive": vals[1].string,
                "totalDeaths": vals[2].string,
                "todaysCases":vals[3].string,
                "todaysDeaths":vals[4].string,
                "todaysIcu":vals[5].string,
                "casesInHospital":vals[6].string,
                "TestsLastWeek":vals[7].string,
                "PositiveRate":vals[8].string,
                "DateString": vals[9].string,
                "firstDose": vals[10].string,
                "secondDose": vals[11].string,
                "total":vals[12].string
                }
    return dict

def updateLocalData():
    data=requests.get('https://services-eu1.arcgis.com/z6bHNio59iTqqSUY/arcgis/rest/services/Covid19_LEACases_Mapped_Historic_Records/FeatureServer/0/query?f=json&groupByFieldsForStatistics=CAST(EXTRACT(YEAR%20FROM%20EventDate%20-INTERVAL%20%27-1%3A59%3A59%27%20HOUR%20TO%20SECOND)%20AS%20VARCHAR(4))%20%7C%7C%20%27-%27%20%7C%7C%20CAST(EXTRACT(MONTH%20FROM%20EventDate%20-INTERVAL%20%27-1%3A59%3A59%27%20HOUR%20TO%20SECOND)%20AS%20VARCHAR(2))%20%7C%7C%20%27-%27%20%7C%7C%20CAST(EXTRACT(DAY%20FROM%20EventDate%20-INTERVAL%20%27-1%3A59%3A59%27%20HOUR%20TO%20SECOND)%20AS%20VARCHAR(2))%2CENGLISH&outFields=OBJECTID%2CP14_100k%2CEventDate%2CENGLISH&outStatistics=%5B%7B%22onStatisticField%22%3A%22P14_100k%22%2C%22outStatisticFieldName%22%3A%22value%22%2C%22statisticType%22%3A%22sum%22%7D%5D&resultType=standard&returnGeometry=false&spatialRel=esriSpatialRelIntersects&where=(EventDate%20BETWEEN%20timestamp%20%272021-01-01%2000%3A00%3A00%27%20AND%20CURRENT_TIMESTAMP)%20AND%20(EventDate%20BETWEEN%20timestamp%20%272021-01-04%2000%3A00%3A00%27%20AND%20timestamp%20%272021-03-15%2000%3A00%3A00%27)')
    