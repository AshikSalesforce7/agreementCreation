import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import previewInvoices from '@salesforce/apex/RentalInvoiceController.previewInvoices';


export default class AgreementCreation extends LightningElement {

    data = [];


    @track
    agreement = {
        Name: '',
        Product__c:'01t5j00000CGE93AAH',
        Start_date__c:'',
        End_date__c:'',
        Amount__c:100,
        Variable_Type__c:'Fixed',
        Payment_type__c:'Monthly',
        Due_Date__c:2
    }

    handleSubmit(event) {
        const newRecord = event.detail.fields;
        console.log('new record===>' + JSON.stringify(newRecord));

        const startNew = new Date(newRecord.Start_date__c).getTime();
        const endNew = new Date(newRecord.End_date__c).getTime();
        const today = new Date().getTime();

        if (startNew < today) {
            this.showToast('Error', 'Start date cannot be lesser than today.', 'error');
            return;
        }

        if (startNew > endNew) {
            this.showToast('Error', 'End date cannot be lesser than start date.', 'error');
            return;
        }

        const agreementCreatedEvent = new CustomEvent('agreementcreated', {
            detail: {
                record: newRecord,
               
            }
        });

        this.dispatchEvent(agreementCreatedEvent);    }

        handleName(event){
        this.agreement.Name=event.target.value;    
        }

        handleAccount(event){
            this.agreement.Account__c=event.target.value;
        }

        handleProduct(event){
            this.agreement.Product__c=event.target.value;
        }

        handleStartDate(event){
            this.agreement.Start_date__c=event.target.value;
        }

        handleEndDate(event){
            this.agreement.End_date__c=event.target.value;
        }

        handleAmount(event){
            this.agreement.Amount__c=event.target.value;
        }

        handleVariableType(event){
            this.agreement.Variable_Type__c=event.target.value;
        }

        handlePaymentType(event){
            this.agreement.Payment_type__c=event.target.value;
        }

        handleDueDate(event){
            this.agreement.Due_Date__c=event.target.value;
        }

    handlePreview(event) {

        let invoiceList = [];

        previewInvoices({
            agreements : [this.agreement]
        })
            .then((data) => {
                console.log('data==> ', JSON.stringify(data));
               if(data.length > 0){
               

                this.data = data;
              console.log('Data  =>>' + JSON.stringify(this.data));
  
               }

               


            });
        
    }



    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(toastEvent);
    }
}