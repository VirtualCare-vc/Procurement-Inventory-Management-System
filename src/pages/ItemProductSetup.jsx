import React, { useMemo, useState } from "react";
import { Boxes, ShoppingCart, Percent, Plus, Pencil } from "lucide-react";

const formatINR = (n) =>
  n === "" || n === null || n === undefined
    ? "-"
    : new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(Number(n || 0));

const CATEGORIES = ["F&B", "HPC", "Fashion", "Electronics"];
const UOMS = ["PCS", "KG", "LTR", "BOX"];

const emptyForm = {
  sku: "",
  barcode: "",
  description: "",
  category: "",
  brand: "",
  subBrand: "",
  uom: "PCS",
  distributorPrice: "",
  retailPrice: "",
};

const seed = [
  {
    sku: "DF-TSHIRT-S",
    barcode: "123456789012",
    description:
      "Premium cotton t-shirt, size small, black color, comfortable fit.",
    category: "F&B",
    brand: "Nike",
    subBrand: "Dri-FIT",
    uom: "PCS",
    distributorPrice: 450,
    retailPrice: 799,
    offerPrice: 650,
    taxPct: 18,
    status: "Active",
  },
  {
    sku: "DF-JEANS-M",
    barcode: "234567890123",
    description:
      "Slim fit denim jeans, size medium, blue wash, durable and stylish.",
    category: "HPC",
    brand: "Levi's",
    subBrand: "501",
    uom: "PCS",
    distributorPrice: 900,
    retailPrice: 1599,
    offerPrice: "",
    taxPct: 18,
    status: "Active",
  },
];

const statusPill = (status = "") => {
  const base =
    "px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap inline-flex items-center";
  if (status === "Active") return `${base} bg-blue-100 text-blue-700`;
  if (status === "Inactive") return `${base} bg-gray-100 text-gray-700`;
  if (status === "Discontinued") return `${base} bg-red-100 text-red-700`;
  return `${base} bg-gray-100 text-gray-600`;
};
const categoryChip =
  "px-2 py-2/3 rounded-full text-xs font-medium  border border-gray-200 text-gray-700";

const ProductRowCard = ({ p, onEdit }) => (
  <div className="border border-gray-200 rounded-xl p-4 space-y-2">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="font-semibold text-gray-900 truncate">{p.sku}</p>
        <p className="text-xs text-gray-500 truncate">{p.barcode || "-"}</p>
      </div>
      <span className={statusPill(p.status)}>{p.status}</span>
    </div>

    <p className="text-sm text-gray-700 line-clamp-2">{p.description || "-"}</p>

    <div className="flex flex-wrap gap-2 text-sm">
      <span className={categoryChip}>{p.category || "-"}</span>
      <span className="px-2 py-1 rounded-full text-xs bg-gray-50 border border-gray-200 text-gray-700">
        {p.brand || "-"}{p.subBrand ? ` • ${p.subBrand}` : ""}
      </span>
      <span className="px-2 py-1 rounded-full text-xs bg-gray-50 border border-gray-200 text-gray-700">
        {p.uom}
      </span>
    </div>

    <div className="grid grid-cols-2 gap-3 text-sm">
      <div>
        <p className="text-gray-500">Distributor</p>
        <p className="font-medium">{formatINR(p.distributorPrice)}</p>
      </div>
      <div>
        <p className="text-gray-500">Retail</p>
        <p className="font-medium">{formatINR(p.retailPrice)}</p>
      </div>
      <div>
        <p className="text-gray-500">Offer</p>
        <p className="font-medium">{p.offerPrice ? formatINR(p.offerPrice) : "-"}</p>
      </div>
      <div>
        <p className="text-gray-500">Tax</p>
        <p className="font-medium">{p.taxPct ?? "-"}{p.taxPct !== "" ? "%" : ""}</p>
      </div>
    </div>

    <button
      className="mt-2 inline-flex items-center gap-1 text-blue-600 hover:underline"
      onClick={() => onEdit(p)}
    >
      <Pencil size={16} /> Edit
    </button>
  </div>
);

const ItemProductSetup = () => {
  const [form, setForm] = useState(emptyForm);
  const [products, setProducts] = useState(seed);
  const [search, setSearch] = useState("");
  const [editSku, setEditSku] = useState(null); 

  const stats = {
    total: products.length,
    active: products.filter((p) => p.status === "Active").length,
    withOffers: products.filter(
      (p) => p.offerPrice && Number(p.offerPrice) < Number(p.retailPrice || 0)
    ).length,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.sku || !form.distributorPrice || !form.retailPrice) return;

    const payload = {
      ...form,
      distributorPrice: Number(form.distributorPrice),
      retailPrice: Number(form.retailPrice),
      offerPrice: "",
      taxPct: 18,
      status: "Active",
    };

    if (editSku) {
      setProducts((prev) =>
        prev.map((p) => (p.sku === editSku ? { ...p, ...payload } : p))
      );
      setEditSku(null);
    } else {
      if (products.some((p) => p.sku === payload.sku)) return;
      setProducts((prev) => [...prev, payload]);
    }
    setForm(emptyForm);
  };

  const startEdit = (p) => {
    setForm({
      sku: p.sku || "",
      barcode: p.barcode || "",
      description: p.description || "",
      category: p.category || "",
      brand: p.brand || "",
      subBrand: p.subBrand || "",
      uom: p.uom || "PCS",
      distributorPrice: p.distributorPrice?.toString() || "",
      retailPrice: p.retailPrice?.toString() || "",
    });
    setEditSku(p.sku);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      [
        p.sku,
        p.barcode,
        p.description,
        p.category,
        p.brand,
        p.subBrand,
        p.uom,
        p.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [products, search]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-5 md:p-6 lg:p-0">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-800">
            Item / Product Setup
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Manage your product catalog, including inventory, pricing, and tax configurations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 mb-8">
        {[
          { label: "Total Products", value: stats.total, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package h-8 w-8 text-muted-foreground"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"></path><path d="m7.5 4.27 9 5.15"></path></svg>},
          {
            label: "Active Products",
            value: stats.active,
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart h-8 w-8 text-muted-foreground"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>,
          },
          {
            label: "Products with Offers",
            value: stats.withOffers,
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-percent h-8 w-8 text-muted-foreground"><line x1="19" x2="5" y1="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>,
          },
        ].map((c, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-5 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-500 text-xs sm:text-sm">{c.label}</p>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                {c.value}
              </h2>
            </div>
            <div className="text-gray-600 text-3xl sm:text-4xl">{c.icon}</div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-5 md:p-6 border border-gray-200 rounded-xl shadow-sm"
      >
        <div className="flex items-center justify-between gap-3 mb-2">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{editSku ? "Edit Product" : "Add New Product"}</h2>
          {editSku && (
            <span className="text-xs text-gray-500">Editing: {editSku}</span>
          )}
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mb-4">
          Fill in the details to {editSku ? "update" : "create"} a product.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 text-gray-500">
          <div>
            <label className="block  mb-1 text-sm font-semibold text-gray-700" >SKU</label>
            <input
              type="text"
              name="sku"
              value={form.sku}
              onChange={handleChange}
              placeholder="DF-PRODUCT-001"
              className="w-full border border-gray-300 text-gray-600 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1 text-sm">Barcode</label>
            <input
              type="text"
              name="barcode"
              value={form.barcode}
              onChange={handleChange}
              placeholder="123456789012"
              inputMode="numeric"
              className="w-full border border-gray-300 rounded-lg px-3 text-gray-600 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1 text-sm">Description</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Product description"
              className="w-full border border-gray-300 text-gray-600 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1 text-sm">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 text-gray-600 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none bg-white"
            >
              <option value="">Select category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1 text-sm">Brand</label>
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="Brand name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700  mb-1 text-sm">Sub Brand</label>
            <input
              type="text"
              name="subBrand"
              value={form.subBrand}
              onChange={handleChange}
              placeholder="Sub brand name"
              className="w-full border  text-gray-600 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block  mb-1 text-sm font-semibold text-gray-700">UOM</label>
            <select
              name="uom"
              value={form.uom}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none bg-white"
            >
              {UOMS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1 text-sm">Distributor Price</label>
            <input
              type="number"
              name="distributorPrice"
              value={form.distributorPrice}
              onChange={handleChange}
              placeholder="₹100.00"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1 text-sm">Retail Price</label>
            <input
              type="number"
              name="retailPrice"
              value={form.retailPrice}
              onChange={handleChange}
              placeholder="₹150.00"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-5 inline-flex items-center gap-2 bg-blue-600 text-white px-4 sm:px-5 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto justify-center"
        >
          <Plus size={18} /> {editSku ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="mt-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full md:w-1/5 border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="mt-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div className="px-4 sm:px-6 pt-5">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">All Products</h2>
            <p className="text-xs sm:text-sm text-gray-500 -mt-1 mb-4">
              Manage your product catalog.
            </p>
          </div>

          <div className="px-4 pb-4 grid grid-cols-1 gap-3 sm:hidden">
            {filtered.length === 0 ? (
              <div className="text-center py-6 text-gray-500">No products found</div>
            ) : (
              filtered.map((p) => (
                <ProductRowCard key={p.sku} p={p} onEdit={startEdit} />
              ))
            )}
          </div>

          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="text-gray-600">
                <tr>
                  <th className="py-3 px-6 font-medium">SKU</th>
                  <th className="py-3 px-6 font-medium">Barcode</th>
                  <th className="py-3 px-6 font-medium">Description</th>
                  <th className="py-3 px-6 font-medium">Category</th>
                  <th className="py-3 px-6 font-medium">Brand</th>
                  <th className="py-3 px-6 font-medium">Sub Brand</th>
                  <th className="py-3 px-6 font-medium">UOM</th>
                  <th className="py-3 px-6 font-medium">Distributor Price</th>
                  <th className="py-3 px-6 font-medium">Retail Price</th>
                  <th className="py-3 px-6 font-medium">Offer Price</th>
                  <th className="py-3 px-6 font-medium">Tax %</th>
                  <th className="py-3 px-6 font-medium">Status</th>
                  <th className="py-3 px-6 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="text-gray-800">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="text-center py-6 text-gray-500">
                      No products found
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.sku} className="border-t border-gray-200 h-16">
                      <td className="py-3 px-6 whitespace-nowrap font-medium">{p.sku}</td>
                      <td className="py-3 px-6 whitespace-nowrap">{p.barcode || "-"}</td>
                      <td className="py-3 px-6">
                        <div className="max-w-[420px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {p.description || "-"}
                        </div>
                      </td>
                      <td className="py-3 px-6">
                        <span className={categoryChip}>{p.category || "-"}</span>
                      </td>
                      <td className="py-3 px-6">{p.brand || "-"}</td>
                      <td className="py-3 px-6">{p.subBrand || "-"}</td>
                      <td className="py-3 px-6">{p.uom}</td>
                      <td className="py-3 px-6">{formatINR(p.distributorPrice)}</td>
                      <td className="py-3 px-6">{formatINR(p.retailPrice)}</td>
                      <td className="py-3 px-6">{p.offerPrice ? formatINR(p.offerPrice) : "-"}</td>
                      <td className="py-3 px-6">{p.taxPct ?? "-"}{p.taxPct !== "" ? "%" : ""}</td>
                      <td className="py-3 px-6">
                        <span className={statusPill(p.status)}>{p.status}</span>
                      </td>
                      <td className="py-3 px-6">
                        <button
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                          onClick={() => startEdit(p)}
                        >
                          <Pencil size={16} /> Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemProductSetup;
