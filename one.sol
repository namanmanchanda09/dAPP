pragma solidity ^0.4.20;


contract one{
    uint claim_no;
    enum claim_status {settled , approved , not_approved , closed}
    enum type_of_claim {reimbusement , cashless}
    uint policy_no;
    enum policy_type {retail , corporate}
    string product_name;
    string plan_name;
    string policy_start_date;
    string policy_end_date;
    uint premium;
    uint simple_interest;
    string insurance_company;
    string dob;
    string gender;
   // uint claim_intimation_date;
    uint diagnosis_code;
    uint procedure_code;
    uint hospital_code;
    string hospital_name;
    string hospital_address;
    string hospital_state;
    // string hospital_city;
    uint hospital_reg_no;
    uint hospital_pan;
    uint hospital_pincode;
   // uint date_of_discharge;
    uint claimed_amount;
    uint nursery_charges;
    uint surgery_charges;
    uint room_charges;
    uint consultation_charges;
    uint investigation_charges;
    uint medicine_charges;
    uint miscellaneous_charges;
    uint ICU_charges;
    uint surgeon_charges_F;
    uint operation_theatre_charges;
    uint total_charges;
    string reason_for_rejection;
    enum status {approved , unapproved}
    
    
    uint count;
    struct date{
        uint day;
        uint month;
        uint year;
    }
    date date_of_discharge;
    date claim_intimation_date;
    function claim_intimation(uint d1 , uint m1 , uint y1 , uint d2 , uint m2 , uint y2) public returns(bool){
        date_of_discharge = date({day:d1,month:m1,year:y1});
        claim_intimation_date = date({day:d2,month:m2,year:y2});
        
        if((claim_intimation_date.year == date_of_discharge.year) && (claim_intimation_date.month == date_of_discharge.month) && (claim_intimation_date.day - date_of_discharge.day <= 30)){
            return true;
            
        }
        
        if((date_of_discharge.month == 1 || date_of_discharge.month == 3 || date_of_discharge.month == 5 || date_of_discharge.month == 7 || date_of_discharge.month == 8 || date_of_discharge.month == 10 || date_of_discharge.month == 12) && (claim_intimation_date.month - date_of_discharge.month == 1)){
            count = ((31 - date_of_discharge.day) + claim_intimation_date.day);
            if(count <= 30){
                return true;
            }
        }
        
        if(((claim_intimation_date.month == date_of_discharge.month) && (claim_intimation_date.year == date_of_discharge.year)) && (claim_intimation_date.day - date_of_discharge.day <= 30)){
            return true;
        }
        
        if((date_of_discharge.month == 2 || date_of_discharge.month == 4 || date_of_discharge.month == 6 || date_of_discharge.month == 9 || date_of_discharge.month == 11) && (claim_intimation_date.month - date_of_discharge.month == 1)){
            count = ((30 - date_of_discharge.day) + claim_intimation_date.day);
            if(count <= 30){
                return true;
            }
        }
        
        if(claim_intimation_date.year - date_of_discharge.year >=2 ){
            return false;
        }
        
        if((claim_intimation_date.year - date_of_discharge.year  == 1) && claim_intimation_date.month == 1 && date_of_discharge.month == 12){
            count = ((31 - date_of_discharge.day)+(claim_intimation_date.day));
            if(count <= 30){
                return true;
            }
        }
        
    }
    
    
    function Hospitalcharges(uint Nursery_charges , uint Room_charges , uint Miscellaneous_charges, uint Surgery_charges ) public {
        nursery_charges = Nursery_charges;
        room_charges = Room_charges;
        miscellaneous_charges = Miscellaneous_charges;
        surgery_charges = Surgery_charges;
        
    }
    
    function PharmacyCharges(uint Medicine_charges) public {
        medicine_charges = Medicine_charges;
    }
    
    function LabCharges(uint Investigation_charges) public {
        investigation_charges = Investigation_charges;
    }
    
    function TotalCharges(uint Total_charges , uint Claimed_amount) public{
        total_charges = Total_charges;
claimed_amount = Claimed_amount;
    }
    
    
    function CheckConditions() public view returns(bool){
        if((nursery_charges>(20*(total_charges/100))) || (room_charges > surgery_charges) || (miscellaneous_charges > (total_charges/10)) || (medicine_charges > (80*(total_charges/100))) || (claimed_amount > 100000)){
            return false;
        }
        else{
            return true;
        }
 
    }
    
    type_of_claim TYPE_OF_CLAIM;
    uint n;
    string a;
    function Type_of_claim(uint xx) public returns(uint,string){
        n = xx;
        if(n == 1){
            TYPE_OF_CLAIM = type_of_claim.reimbusement;
            a = "reimbusement";
        }
        if(n == 2){
            TYPE_OF_CLAIM = type_of_claim.cashless;
            a = "cashless";
        }
        return (uint(TYPE_OF_CLAIM),a);
    }
    
    
    address public hospital = 0x50fce5bb2c22f1fd6e2fd542476f879d5911b4ec;
    modifier onlyOwner {
        require(msg.sender == hospital);
        _;
    }
    
    function Hospital_data_input(uint Consultation_charges , uint Icu_charges , uint Surgeon_charges_F , uint Operation_theatre_charges) onlyOwner public  returns(uint,uint,uint,uint){
        consultation_charges = Consultation_charges;
        ICU_charges = Icu_charges;
        surgeon_charges_F = Surgeon_charges_F;
        operation_theatre_charges = Operation_theatre_charges;
        return(consultation_charges,ICU_charges,surgeon_charges_F,operation_theatre_charges);
    }
    
    address public agency = 0xbedc33d2e56bedda7ad812c25f72361e7fe282d5;
    modifier onlyAgency{
        require(msg.sender == hospital);
        _;
    }
    
    function Agency_data_input(string Product_name , string Plan_name , string Insurance_company) onlyAgency public returns(string,string,string){
        product_name = Product_name;
        plan_name = Plan_name;
        insurance_company = Insurance_company;
        return (product_name , plan_name , insurance_company);
    }
    
    
    function final_Check() public view returns(bool){
        if(claim_intimation(date_of_discharge.day , date_of_discharge.month,date_of_discharge.year,claim_intimation_date.day,claim_intimation_date.month,claim_intimation_date.year) == true && CheckConditions() == true){
            return true;
        }
        
        else{
            return false;
        }
    }



    
}