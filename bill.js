function calculator() {
    var amount=document.getElementById('bill_amount').value;
     var perc=document.getElementById('tip_perc').value;
     var dis=document.getElementById('dis_perc').value;
     var disc=amount*(dis/100)
    var tip=amount*(perc/100);
    var total=tip+Number(amount)-disc;
    document.getElementById('tip_total').value=tip;
    document.getElementById('dis_total').value=disc;
    document.getElementById('total_billed').value=total;
}
