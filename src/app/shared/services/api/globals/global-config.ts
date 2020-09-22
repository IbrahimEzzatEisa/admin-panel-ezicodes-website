
export const BaseURL = "http://api.ezicodes.com";
export const API_URL = BaseURL+'/api/Account';
export const EZIAPI_URL = BaseURL+'/api';


export class END_POINTS {
    // Employee API
    public static login = API_URL+"/login";
    public static slide = EZIAPI_URL+"/Sliders";
    public static service = EZIAPI_URL+"/Services";

    public static serviceByLang = EZIAPI_URL+"/Services/GetAll";

    public static message = EZIAPI_URL+"/Messages";
    public static configuration = EZIAPI_URL+"/Configuration";
    public static configurations = EZIAPI_URL+"/Configuration/GetAll";

    public static why = EZIAPI_URL+"/WhyUs";






}


