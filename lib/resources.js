var APIResource = require('./APIResource')


class AccessToken extends APIResource {}
AccessToken.resource = '/access_tokens'
AccessToken.object_type = 'access_token'

class AutopayEnrollment extends APIResource {}
AutopayEnrollment.resource = '/autopay_enrollments'
AutopayEnrollment.object_type = 'autopay_enrollment'

class Event extends APIResource {}
Event.resource = '/events'
Event.object_type = 'event'

class Account extends APIResource {}
Account.resource = '/accounts'
Account.object_type = 'account'

class DepositAccount extends APIResource {}
DepositAccount.resource = '/deposit_accounts'
DepositAccount.object_type = 'deposit_account'

class Transaction extends APIResource {}
Transaction.resource = '/transactions'
Transaction.object_type = 'transaction'

class PaymentMethod extends APIResource {}
PaymentMethod.resource = '/payment_methods'
PaymentMethod.object_type = 'payment_method'

class Address extends APIResource {}
Address.resource = '/addresses'
Address.object_type = 'address'

class RecurringInvoice extends APIResource {}
RecurringInvoice.resource = '/recurring_invoices'
RecurringInvoice.object_type = 'recurring_invoice'

class Invoice extends APIResource {}
Invoice.resource = '/invoices'
Invoice.object_type = 'invoice'

class InvoiceItem extends APIResource {}
InvoiceItem.resource = '/invoice_items'
InvoiceItem.object_type = 'invoice_item'

class InvoicePayer extends APIResource {}
InvoicePayer.resource = '/invoice_payers'
InvoicePayer.object_type = 'invoice_payer'

class InvoiceItemAllocation extends APIResource {}
InvoiceItemAllocation.resource = '/invoice_item_allocations'
InvoiceItemAllocation.object_type = 'invoice_item_allocation'

module.exports = {
    AccessToken: AccessToken,
    AutopayEnrollment: AutopayEnrollment,
    Event: Event,
    Account: Account,
    DepositAccount: DepositAccount,
    Transaction: Transaction,
    PaymentMethod: PaymentMethod,
    Address: Address,
    RecurringInvoice: RecurringInvoice,
    Invoice: Invoice,
    InvoiceItem: InvoiceItem,
    InvoicePayer: InvoicePayer,
    InvoiceItemAllocation: InvoiceItemAllocation
}