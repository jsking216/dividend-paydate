package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jsking216/dividend-paydate/models"
	"github.com/jsking216/dividend-paydate/utils"
)

var NewPaydate models.PayDate

func CreatePaydate(w http.ResponseWriter, r *http.Request) {
	CreatePaydate := &models.PayDate{}
	utils.ParseBody(r, CreatePaydate)
	b := CreatePaydate.CreatePaydate()
	res, _ := json.Marshal(b)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func GetAllPaydates(w http.ResponseWriter, r *http.Request) {
	newPaydates := models.GetAllPaydates()
	res, _ := json.Marshal(newPaydates)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func GetPaydateByTicker(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	ticker := vars["ticker"]
	PaydateDetails, _ := models.GetPaydateByTicker(ticker)
	res, _ := json.Marshal(PaydateDetails)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func DeletePaydateByTicker(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	ticker := vars["ticker"]
	Paydate := models.DeletePaydateByTicker(ticker)
	res, _ := json.Marshal(Paydate)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}
