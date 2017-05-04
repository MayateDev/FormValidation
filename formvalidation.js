window.onload = function () {
  $(document).ready(function(){

    function checkIfPhoneNr(str) {
      return /^[+]?[\d ]+$/.test(str);
    }

    function checkIfOnlyChars(str) {
      return /^[a-zåäö -’'‘ÆÐƎƏƐƔĲŊŒẞÞǷȜæðǝəɛɣĳŋœĸſßþƿȝĄƁÇĐƊĘĦĮƘŁØƠŞȘŢȚŦŲƯY̨Ƴąɓçđɗęħįƙłøơşșţțŧųưy̨ƴÁÀÂÄǍĂĀÃÅǺĄÆǼǢƁĆĊĈČÇĎḌĐƊÐÉÈĖÊËĚĔĒĘẸƎƏƐĠĜǦĞĢƔáàâäǎăāãåǻąæǽǣɓćċĉčçďḍđɗðéèėêëěĕēęẹǝəɛġĝǧğģɣĤḤĦIÍÌİÎÏǏĬĪĨĮỊĲĴĶƘĹĻŁĽĿʼNŃN̈ŇÑŅŊÓÒÔÖǑŎŌÕŐỌØǾƠŒĥḥħıíìiîïǐĭīĩįịĳĵķƙĸĺļłľŀŉńn̈ňñņŋóòôöǒŏōõőọøǿơœŔŘŖŚŜŠŞȘṢẞŤŢṬŦÞÚÙÛÜǓŬŪŨŰŮŲỤƯẂẀŴẄǷÝỲŶŸȲỸƳŹŻŽẒŕřŗſśŝšşșṣßťţṭŧþúùûüǔŭūũűůųụưẃẁŵẅƿýỳŷÿȳỹƴźżžẓ]+$/i.test(str);
    }

    function checkIfOnlyWordChars(str) {
      return /^[a-zåäö \d-’'‘ÆÐƎƏƐƔĲŊŒẞÞǷȜæðǝəɛɣĳŋœĸſßþƿȝĄƁÇĐƊĘĦĮƘŁØƠŞȘŢȚŦŲƯY̨Ƴąɓçđɗęħįƙłøơşșţțŧųưy̨ƴÁÀÂÄǍĂĀÃÅǺĄÆǼǢƁĆĊĈČÇĎḌĐƊÐÉÈĖÊËĚĔĒĘẸƎƏƐĠĜǦĞĢƔáàâäǎăāãåǻąæǽǣɓćċĉčçďḍđɗðéèėêëěĕēęẹǝəɛġĝǧğģɣĤḤĦIÍÌİÎÏǏĬĪĨĮỊĲĴĶƘĹĻŁĽĿʼNŃN̈ŇÑŅŊÓÒÔÖǑŎŌÕŐỌØǾƠŒĥḥħıíìiîïǐĭīĩįịĳĵķƙĸĺļłľŀŉńn̈ňñņŋóòôöǒŏōõőọøǿơœŔŘŖŚŜŠŞȘṢẞŤŢṬŦÞÚÙÛÜǓŬŪŨŰŮŲỤƯẂẀŴẄǷÝỲŶŸȲỸƳŹŻŽẒŕřŗſśŝšşșṣßťţṭŧþúùûüǔŭūũűůųụưẃẁŵẅƿýỳŷÿȳỹƴźżžẓ]+$/i.test(str);
    }

    function checkIfEmail(str) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(str);
    }

    var requierdError;
    var lengthError;
    var conditionError;
    var oneOfError;
    var formValid;

    function doFormValidation(customClass) {
      console.log('FormValidation: Started');
      var validateClass = '';
      var minLength = 0;
      var maxLength = 0;
      var errorCount = 0;
      var oneOfInputs = [];
      var oneOfIDs = [];
      var inputObjs = [];
      var count = 0;
      var inputHasValue =  false;
      var oneOfErrorColors = [
        '226, 83, 38',
        '231, 207, 45',
        '170, 78, 132',
        '35, 77, 187',
        '33, 101, 110'
      ]

      if (customClass) {
        validateClass = customClass;
      }
      else {
        validateClass = "validate";
      }

      //console.log('ValidationClass: ' + validateClass);
      if ($('.' + validateClass).length > 0) {
        $('.' + validateClass).each(function() {
          //console.log('Start validation for: ' + $(this).attr('id'));
          var hasError = false;
          requierdError = false;
          lengthError = false;
          conditionError = false;
          oneOfError = true;
          inputHasValue = false;

          if ($(this).data('validate-length') == true) {
            minLength = $(this).data('min-length');
            maxLength = $(this).data('max-length');

            if (!minLength) {
              minLength = 2;
            }
            if (!maxLength) {
              minLength = 50;
            }

            if ($(this).val().length >= minLength && $(this).val().length <= maxLength) {
              inputHasValue = true;
            }
            else {
              if (($(this).data('validate-type') === 'one-of' || ($(this).data('validate-type') == null || $(this).data('validate-type') === '')) && $(this).val().toString().length <= 0) {
                //
              }
              else {
                errorCount++;
                hasError = true;
                lengthError = true;
              }
            }
          }

          if ($(this).data('validate-type') === 'requierd') {
            if ($(this).val().length === 0) {
              errorCount++;
              requierdError = true;
              hasError = true;
            }
          }

          if ($(this).data('input-condition') != null && $(this).data('input-condition') !== '') {
            if ($(this).data('input-condition') === 'chars') {
              if ($(this).val().length > 0) {
                if (!checkIfOnlyChars($(this).val())) {
                  errorCount++;
                  conditionError = true;
                  hasError = true;
                }
              }
            }

            if ($(this).data('input-condition') === 'numbers') {
              if ($(this).val().length > 0) {
                if (!checkIfPhoneNr($(this).val())) {
                  errorCount++;
                  conditionError = true;
                  hasError = true;
                }
              }
            }

            if ($(this).data('input-condition') === 'wordchars') {
              if ($(this).val().length > 0) {
                if (!checkIfOnlyWordChars($(this).val())) {
                  errorCount++;
                  conditionError = true;
                  hasError = true;
                }
              }
            }

            if ($(this).data('input-condition') === 'mail') {
              if ($(this).val().length > 0) {
                if (!checkIfEmail($(this).val())) {
                  errorCount++;
                  conditionError = true;
                  hasError = true;
                }
              }
            }
          }

          if ($(this).data('validate-type') === 'one-of') {
            var inputObj = {
              input: this,
              requierdError: requierdError,
              lengthError: lengthError,
              conditionError: conditionError,
              groupId: $(this).data('one-of-id'),
              hasValue: inputHasValue
            };

            inputObjs.push(inputObj);

            if (oneOfIDs.indexOf($(this).data('one-of-id')) == -1) {
              oneOfIDs.push($(this).data('one-of-id'));
            }
          }
          else {
            if (hasError) {
              fillErrorLbl(this, '223, 41, 41');
            }
            else {
              $(this).removeAttr('style');
              $('#' + $(this).attr('id') + 'ErrorLbl').html('');
            }
          }
        });

        oneOfIDs.forEach(function(groupId) {
          if (inputObjs.filter(function(e) { return e.hasValue == true && e.conditionError == false && e.groupId === groupId; }).length > 0) {
            oneOfError = false;
          }
          //console.log('oneOfError: ' + oneOfError);
          inputObjs.forEach(function(item) {
            var inputField = item.input;
            requierdError = false;
            lengthError = false;
            conditionError = false;

            if ($(inputField).data('one-of-id') === groupId) {
              if (item.lengthError || item.conditionError || item.requierdError || oneOfError) {
                lengthError = item.lengthError;
                conditionError = item.conditionError;
                requierdError = item.requierdError;

                fillErrorLbl(inputField, oneOfErrorColors[count]);
                errorCount++;
              }
              else {
                $('#' + $(inputField).attr('id')).removeAttr('style');
                $('#' + $(inputField).attr('id') + 'ErrorLbl').html('');
              }
            }
          });
          if (count < 4) {
            count++;
          }
          else {
            count = 0;
          }
        });

        if (errorCount > 0) {
          formValid = false;
          //console.log('ErrorCount: ' + errorCount);
        }
        else {
          formValid = true;
        }
      }
      else {
        formValid = true;
      }
      //console.log('FormValidation: ' + formValid);
    }

    function fillErrorLbl(input, rgbColor) {
      var errorText = $(input).data('error-text');
      var oneOfTextAdd = '';
      var requierdTextAdd = '';
      var minLengthTextAdd = '';
      var maxLengthTextAdd = '';
      var conditionTextAdd = '';
      var oneOfDynStr = '';

      if ($(input).data('validate-type') === 'one-of' && oneOfError) {
        oneOfTextAdd = 'Detta fält tillhör en grupp. Ett av fälten måste vara korrekt ifyllt.<br>Fältet tillhör grupp: <b>[' + $(input).data('one-of-id') + ']</b>&nbsp;&nbsp;&nbsp;<span id="oneOfErrorInfo" class="oneOfErrorInfo" title="I en grupp av fält måste minst ett av fälten\nvara ifyllda för att du ska kunna gå vidare.\n\nVarje grupp har en egen färgkod.">&#xf05a;</span><br>'
      }

      if ($(input).data('validate-type') === 'requierd' && requierdError) {
        requierdTextAdd = 'Detta fält är obligatoriskt<br>';
      }

      if ($(input).data('min-length') >= 0 && lengthError) {
        minLengthTextAdd = 'Minst ' + $(input).data('min-length') + ' tecken<br>';
      }

      if ($(input).data('max-length') >= 0 && lengthError) {
        maxLengthTextAdd = 'Max ' + $(input).data('max-length') + ' tecken<br>';
      }

      if ($(input).data('input-condition') === 'chars' && conditionError) {
        conditionTextAdd = 'Du får bara använda bokstäver, - och mellanslag<br>';
      }
      else if ($(input).data('input-condition') === 'numbers' && conditionError) {
        conditionTextAdd = 'Du får bara använda siffror och + tecken<br>';
      }
      else if ($(input).data('input-condition') === 'wordchars' && conditionError) {
        conditionTextAdd = 'Du får bara använda bokstäver, siffror, mellanslag och - tecken<br>';
      }
      else if ($(input).data('input-condition') === 'mail' && conditionError) {
        conditionTextAdd = 'En giltig e-post adress måste anges i detta fält<br>';
      }
      $('#' + $(input).attr('id')).css({'border' : '1px solid rgb(' + rgbColor + ')' });
      $('#' + $(input).attr('id') + 'ErrorLbl').html(errorText + requierdTextAdd + oneOfTextAdd + minLengthTextAdd + maxLengthTextAdd + conditionTextAdd);
      $('#' + $(input).attr('id') + 'ErrorLbl').css({'border-color' : 'rgb(' + rgbColor + ')'});
      $('#' + $(input).attr('id') + 'ErrorLbl').css({'background' : 'rgba(' + rgbColor + ', 0.3)'});
    }
  });
}
