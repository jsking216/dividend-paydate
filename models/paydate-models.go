package models

import (
	"github.com/jinzhu/gorm"
	"github.com/jsking216/dividend-paydate/config"
)

var db *gorm.DB

type Paydate struct {
	gorm.Model
	//Id          string `json:"id"`
	Ticker  string `gorm:""json:"ticker"`
	ExDiv   string `json:"exdiv"`
	Paydate string `json:"paydate"`
}

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Paydate{})
}

func (p *Paydate) CreatePaydate() *Paydate {
	db.NewRecord(p)
	db.Create(&p)
	return p
}

func GetAllPaydates() []Paydate {
	var Paydates []Paydate
	db.Find(&Paydates)
	return Paydates
}

func GetPaydateByTicker(ticker string) (*Paydate, *gorm.DB) {
	var getPaydate Paydate
	db := db.Where("ticker = ?", ticker).Find(&getPaydate)
	return &getPaydate, db
}

func DeletePaydateByTicker(ticker string) Paydate {
	var paydate Paydate
	db.Where("ticker = ?", ticker).Delete(paydate)
	return paydate
}
