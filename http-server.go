package main

import (
	"net/http"
	"fmt"
)

//this stops user client from seeing anything on the server. TODO
func handler(w http.ResponseWriter, r *http.Request){
	http.ServeFile(w, r, r.URL.Path[1:])
	fmt.Println(r.URL.Path[1:])
}

func main(){
	http.HandleFunc("/", handler)

	fmt.Println("Listening on 3000")
	http.ListenAndServe(":3000", nil)
}
