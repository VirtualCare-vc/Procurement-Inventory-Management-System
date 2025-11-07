import React from "react";

const InvoiceEditor = () => {
  return (
    <div className="">
      <div className="bg-white p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2  text-blue-600 font-medium cursor-pointer border border-blue-500 rounded-lg px-4 py-2 bg-white">
              <span className="text-base">%</span>
              Configure Tax
            </button>

            <div className="relative">
              <button className="cursor-pointer flex items-center  text-gray-700 font-medium border border-gray-200 rounded-lg px-4 py-2 bg-white">
                <span>Panamanian Balboa (PAB, B/.)</span>
                <span className="ml-2 text-gray-400">▾</span>
              </button>
            </div>
          </div>

          <button className="cursor-pointer  font-medium text-white bg-blue-600 border border-blue-600 rounded-lg px-4 py-2">
            Edit Columns/Formulas
          </button>
        </div>

        {/* Lines table + Summary */}
        <div className="flex gap-10">
          {/* Lines table */}
          <div className="flex-1 rounded-2xl border border-gray-300 overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-3  font-medium flex justify-between gap-30 items-center rounded-t-2xl">
              <div className="col-span-2 text-left">Item</div>
              <div className="flex justify-around">
                <div className="text-center flex justify-between gap-12">
              <p>Tax rate</p>
              <p>Quantity</p></div>
              <div  className="text-center flex justify-between gap-12">
                <p>Rate</p>
              <p>Amount</p>

              </div>
              <div className="text-center flex justify-between gap-12">
                <p>Tax</p>
                <p>Total</p>
              </div>
              </div>
              
            </div>

            <div className="bg-gray-50 border-t border-dashed border-gray-300 px-4 py-4 text-center  text-gray-600">
              <button className="inline-flex items-center gap-1 cursor-pointer">
                <span className="text-base">＋</span>
                <span>Add New Line</span>
              </button>
            </div> {/* Summary panel */}
         
         <div className="flex justify-end m-3">
           <div className="w-80   text-gray-700">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Amount</span>
                <span className="font-medium">PAB 0.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tax</span>
                <span className="font-medium">PAB 0.00</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="flex items-center gap-2 text-blue-700 cursor-pointer">
                <span className="h-5 w-5 flex items-center justify-center rounded-full border border-blue-500 text-xs">
                  🏷
                </span>
                <span>Give Item Wise Discount</span>
              </button>

              <button className="flex items-center gap-2 text-blue-700 cursor-pointer">
                <span className="h-5 w-5 flex items-center justify-center rounded-full border border-blue-500 text-xs">
                  +
                </span>
                <span>Give Discount on Total</span>
              </button>

              <button className="flex items-center gap-2 text-blue-700 cursor-pointer">
                <span className="h-5 w-5 flex items-center justify-center rounded-full border border-blue-500 text-xs">
                  +
                </span>
                <span>Add Additional Charges</span>
              </button>

              <button className="flex items-center gap-2 text-blue-700 cursor-pointer">
                <span className="h-5 w-5 flex items-center justify-center rounded-full border border-blue-500 text-xs">
                  $
                </span>
                <span>Hide Totals</span>
              </button>

              <button className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <span className="h-4 w-4 border border-gray-300 rounded-sm bg-white" />
                <span>Summarise Total Quantity</span>
              </button>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-lg inline-block border-b border-dotted border-gray-400 pb-1">
                  Total (PAB)
                </span>
                <span className="font-semibold text-lg">PAB 0.00</span>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <button className="flex items-center gap-2 text-blue-700 cursor-pointer">
                <span className="text-lg leading-none">＋</span>
                <span>Add Custom Fields</span>
              </button>

              <button className="flex items-center gap-2 text-blue-700 cursor-pointer">
                <span className="h-5 w-5 flex items-center justify-center rounded-full border border-blue-500 text-xs">
                  Ⓢ
                </span>
                <span>Show Total In Words</span>
              </button>
            </div>

            <div className="mt-6">
              <button className="w-full flex items-center justify-center gap-2 border border-dashed border-blue-400 rounded-lg py-3  text-blue-700 bg-blue-50">
                <span>✒️</span>
                <span>Add Signature</span>
              </button>
            </div>
          </div>
         </div>
          </div>

         
        </div>

        {/* Bottom Section: Add Info, Terms, Notes */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <button className="cursor-pointer flex items-center justify-center gap-2 bg-white  text-gray-700 font-medium border border-dashed border-blue-300 rounded-lg py-4">
            <span className="text-blue-600">✚</span>
            <span>Add Terms &amp; Conditions</span>
          </button>

          <button className="cursor-pointer flex items-center justify-center gap-2 bg-white  text-gray-700 font-medium border border-dashed border-blue-300 rounded-lg py-4">
            <span className="text-blue-600">📄</span>
            <span>Add Notes</span>
          </button>

          <button className="cursor-pointer flex items-center justify-center gap-2 bg-white  text-gray-700 font-medium border border-dashed border-blue-300 rounded-lg py-4">
            <span className="text-blue-600">📎</span>
            <span>Add Attachments</span>
          </button>
        </div>

        <div className="mt-4 max-w-xs">
          <button className="cursor-pointer flex items-center justify-center gap-2 w-full bg-white  text-gray-700 font-medium border border-dashed border-blue-300 rounded-lg py-4">
            <span className="text-blue-600">📄</span>
            <span>Add Additional Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceEditor;
