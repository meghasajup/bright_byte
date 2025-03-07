import { Invoice } from "../model/invoiceSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const invoiceAdd = asyncHandler(async (req, res) => {
    try {
        const { invoiceNo, date, name, items, totalInWords, taxableAmount, cgst, sgst, igst, grandTotal,gstin,address } = req.body;

      

        // Validate required fields
        if (!invoiceNo || !date || !name || !items || !grandTotal) {
            return res.status(400).json({ message: 'Please fill all the required fields' });
        }

        const newInvoice = await Invoice.create({
            invoiceNo,
            date,
            name,
            items,
            totalInWords,
            taxableAmount,
            cgst,
            sgst,
            igst,
            gstin,
            address,
            grandTotal
        });

        await newInvoice.save();

        res.status(201).json({ sucess:true, message: 'Invoice created successfully', invoice: newInvoice });
    } catch (error) {
        console.error('Error creating invoice:', error);
        res.status(500).json({ sucess:true, message: error.message });
    }
});




export const getAllInvoices = asyncHandler(async (req, res) => {
    try {
        const invoices = await Invoice.find();

        if (!invoices.length) {
            return res.status(404).json({ success: false, message: 'No invoices found' });
        }

        res.status(200).json({ success: true, invoices });
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

export const getInvoiceById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const invoice = await Invoice.findById(id);

        if (!invoice) {
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }

        res.status(200).json({ success: true, invoice });
    } catch (error) {
        console.error('Error fetching invoice:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});