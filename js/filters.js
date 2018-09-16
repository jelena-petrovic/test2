function validateMacField() {
    macField = $('#macAddress');
    if (macField.val() === undefined || macField.val() === "") {
        macField.addClass('empty');
        return false;
    } else {
        macField.removeClass('empty');
    }
    if (macField.val().match('^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$')) {
        macField.removeClass('error');
    } else {
        macField.addClass('error');
        return false;
    }
    return true;
}
function validateContractField() {
    contractField = $('#contractId');
    if (contractField.val() === undefined || contractField.val() === "") {
        contractField.addClass('empty');
        return false;
    } else {
        contractField.removeClass('empty');
    }
    if (contractField.val().match('[0-9]+')) {
        contractField.removeClass('error');
    } else {
        contractField.addClass('error');
        return false;
    }
    return true;
}

function select1Day() {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    $('#datepicker').datepicker('setDate', d);
    $('#datepicker2').datepicker('setDate', new Date());
}

function select7Days() {
    var d = new Date();
    d.setDate(d.getDate() - 7);
    $('#datepicker').datepicker('setDate', d);
    $('#datepicker2').datepicker('setDate', new Date());
}

$(function () {
    var contracts;
    
    // Autocomplete
    $.getJSON('/data/contracts.json', function(data){
        contracts = data;
        macs = $.map(contracts, function(element){
            return element.mac;
        });
        $('#macAddress').autocomplete({
            source: macs,
            change: function() {
                if (!validateMacField()) {
                    return;
                }
                var newMac = $(this).val();
                matching_contracts = $.map(contracts, function(element){
                    if (element.mac === newMac) {
                        return element.contract;
                    }
                });
                if (matching_contracts.length > 0) {
                    $('#contractId').val(matching_contracts[0]).removeClass("empty error");
                }
            }
        });
        
        contracts_list = $.map(contracts, function(element){
            return element.contract;
        });
        $('#contractId').autocomplete({
            source: contracts_list,
            change: function() {
                if (!validateContractField()) {
                    return;
                }
                var newContract = $(this).val();
                matching_macs = $.map(contracts, function(element){
                    if (element.contract === newContract) {
                        return element.mac;
                    }
                });
                if (matching_macs.length > 0) {
                    $('#macAddress').val(matching_macs[0]).removeClass("empty error");
                }
            }
        });

    });
    
    $('#applyFilters').click(function(){
        ret = validateMacField();
        ret = validateContractField() && ret;
        if (!ret) {
            $('#errorMessage').show();
            return false;
        }
         
        $('#errorMessage').hide();

        $('#selectedMac').html($('#macAddress').val());
        $('#selectedContract').html($('#contractId').val());
        $('.moreInfoWrap').slideDown("slow");
        $('.searchForWrapper').slideUp("slow");
        select1Day();
        reloadTabs();
        return false;
    });

    $('#resetFilter').click(function(){
        $('.searchForWrapper').slideDown("slow");
        $('.moreInfoWrap').slideUp("slow");
        $('#macAddress, #contractId').val("");

        $('#tablesContent, #graphsContent').html("");
        return false;
    });

    $("#datepicker").datepicker({
        numberOfMonths: 2,
        dateFormat: 'dd.mm.yy',
        onSelect: function(dateText, inst) {
            reloadTabs();
            $('.sevenDays, .oneDay').removeClass('active');
        }
    });

    $("#datepicker2").datepicker({
        numberOfMonths: 2,
        dateFormat: 'dd.mm.yy',
        onSelect: function(dateText, inst) {
            reloadTabs();
            $('.sevenDays, .oneDay').removeClass('active');
        }
    });

    $('.oneDay').click(function () {
        select1Day();
        $(this).addClass('active');
        $('.sevenDays').removeClass('active');
        reloadTabs();
        return false;
    });
    $('.sevenDays').click(function () {
        select7Days();
        $(this).addClass('active');
        $('.oneDay').removeClass('active');
        reloadTabs();
        return false;
    });
});