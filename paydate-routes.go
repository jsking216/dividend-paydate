package routes

import (
	"github.com/gorilla/mux"
	"github.com/jsking216/dividend-paydate/controllers"
)

var RegisterPaydateRoutes = func(router *mux.Router) {
	router.HandleFunc("/paydates/", controllers.GetAllPaydates).Methods("GET")
	router.HandleFunc("/paydates/", controllers.CreatePaydate).Methods("POST")
	router.HandleFunc("/paydates/{ticker}", controllers.GetPaydateByTicker).Methods("GET")
	router.HandleFunc("/paydates/{ticker}", controllers.DeletePaydateByTicker).Methods("DELETE")
}
