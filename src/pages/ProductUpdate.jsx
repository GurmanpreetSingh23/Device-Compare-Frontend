import axios from "../utils/AxiosInstance";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Footer from "../components/Footer";

function ProductUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/device-compare/devices/product/${id}`, {
          withCredentials: true,
        });

        const { type, product } = res.data;

        setForm(product);
        setType(type);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecsChange = (value) => {
    setForm((prev) => ({ ...prev, specs: value.split("\n") }));
  };

  const handleBuyLinksChange = (index, field, value) => {
    const updated = [...form.buyLinks];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, buyLinks: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        type === "laptop"
          ? `/device-compare/devices/laptop/update`
          : `/device-compare/devices/mobile/update`;

      await axios.post(url, form, { withCredentials: true });
      alert("Product updated successfully!");
      navigate("/device-compare/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert("Update failed!");
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <h1 className="text-3xl font-medium text-white/50 mb-1">Loading...</h1>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p className="text-2xl font-semibold text-black/70">
          No product found.
        </p>
      </div>
    );
  }

  return (
    <>
      <main className="h-auto w-full flex flex-col px-4 py-4 gap-6">
        <header className="w-full h-[9vh] rounded-3xl bg-black/20 backdrop-blur-3xl flex justify-between items-center px-4">
          <h1 className="text-[#F66435] font-medium text-sm tracking-tight">
            Device-Compare{" "}
            <span className="text-black/80">- Update Product</span>
          </h1>
          <button
            className="p-2 border border-black/20 rounded-2xl text-sm text-black/70"
            onClick={() => navigate("/device-compare/admin/dashboard")}
          >
            Dashboard
          </button>
        </header>

        {/* MOBILE FORM */}
        {type === "mobile" ? (
          <div className="h-full w-full bg-black/20 rounded-4xl p-4 backdrop-blur-3xl overflow-hidden flex flex-col gap-2">
            <h1 className="font-medium text-black/80 ms-[1vw]">
              Update Mobile
            </h1>

            <form
              onSubmit={handleSubmit}
              className="w-full h-auto bg-black/30 backdrop-blur-3xl rounded-4xl p-4 flex flex-col gap-4"
            >
              {/* Name + Price */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  value={form.name || ""}
                  className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                />

                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  onChange={handleChange}
                  value={form.price || ""}
                  className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                />
              </div>

              {/* Specs */}
              <textarea
                name="specs"
                onChange={(e) => handleSpecsChange(e.target.value)}
                value={(form.specs || []).join("\n")}
                className="w-full min-h-[165px] bg-white/60 backdrop-blur-2xl text-sm rounded-2xl p-3
              border border-black/20 focus:border-black/50 outline-none transition duration-200
              no-scrollbar resize-none"
              ></textarea>

              {/* Buy Links */}
              <div className="w-full flex flex-col gap-2">
                <label className="font-semibold text-sm text-white/50">
                  Buy Links
                </label>

                {(form.buyLinks || []).map((link, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full"
                  >
                    <input
                      type="text"
                      value={link.site}
                      placeholder="Site"
                      onChange={(e) =>
                        handleBuyLinksChange(i, "site", e.target.value)
                      }
                      className="p-2 rounded-2xl bg-white/60 backdrop-blur-2xl text-sm outline-none"
                    />

                    <input
                      type="text"
                      value={link.url}
                      placeholder="URL"
                      onChange={(e) =>
                        handleBuyLinksChange(i, "url", e.target.value)
                      }
                      className="p-2 rounded-2xl bg-white/60 backdrop-blur-2xl text-sm outline-none"
                    />
                  </div>
                ))}
              </div>

              {/* Image + BetterFor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-sm text-white/50">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={form.image || ""}
                    onChange={handleChange}
                    className="bg-white/60 backdrop-blur-2xl p-2 rounded-2xl text-sm outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-sm text-white/50">
                    Better For
                  </label>
                  <input
                    type="text"
                    name="betterFor"
                    value={form.betterFor || ""}
                    onChange={handleChange}
                    className="bg-white/60 backdrop-blur-2xl p-2 rounded-2xl text-sm outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-yellow-600 py-2 rounded-3xl w-full cursor-pointer"
              >
                Update
              </button>
            </form>
          </div>
        ) : (
          <div className="h-auto w-full bg-black/20 rounded-4xl p-4 backdrop-blur-3xl flex flex-col gap-2">
            <h1 className="font-medium text-black/80 ms-[1vw]">
              Update Laptop
            </h1>

            <form
              onSubmit={handleSubmit}
              className="w-full h-auto bg-black/30 backdrop-blur-3xl rounded-4xl p-4 flex flex-col gap-4"
            >
              {/* BRAND + MODEL */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={form.brand || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    Model
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={form.model || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>
              </div>

              {/* OLD PRICE + NEW PRICE */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    Old Price
                  </label>
                  <input
                    type="text"
                    name="old_price"
                    value={form.old_price || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    Latest Price
                  </label>
                  <input
                    type="text"
                    name="latest_price"
                    value={form.latest_price || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>
              </div>

              {/* DISCOUNT + RATINGS */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="text"
                    name="discount"
                    value={form.discount || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    Ratings Count
                  </label>
                  <input
                    type="text"
                    name="ratings"
                    value={form.ratings || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>
              </div>

              {/* REVIEWS + STARS */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    Reviews
                  </label>
                  <input
                    type="text"
                    name="reviews"
                    value={form.reviews || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    Star Rating
                  </label>
                  <input
                    type="text"
                    name="star_rating"
                    value={form.star_rating || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>
              </div>

              {/* PROCESSOR */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    Processor Brand
                  </label>
                  <input
                    type="text"
                    name="processor_brand"
                    value={form.processor_brand || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    Processor Name
                  </label>
                  <input
                    type="text"
                    name="processor_name"
                    value={form.processor_name || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>
              </div>

              {/* GENERATION + OS */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    Processor Gen
                  </label>
                  <input
                    type="text"
                    name="processor_gnrtn"
                    value={form.processor_gnrtn || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    Operating System
                  </label>
                  <input
                    type="text"
                    name="os"
                    value={form.os || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>
              </div>

              {/* OS BIT + WARRANTY */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    OS Bit
                  </label>
                  <input
                    type="text"
                    name="os_bit"
                    value={form.os_bit || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    Warranty
                  </label>
                  <input
                    type="text"
                    name="warranty"
                    value={form.warranty || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>
              </div>

              {/* RAM */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    RAM (GB)
                  </label>
                  <input
                    type="text"
                    name="ram_gb"
                    value={form.ram_gb || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    RAM Type
                  </label>
                  <input
                    type="text"
                    name="ram_type"
                    value={form.ram_type || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>
              </div>

              {/* STORAGE */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    SSD
                  </label>
                  <input
                    type="text"
                    name="ssd"
                    value={form.ssd || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    HDD
                  </label>
                  <input
                    type="text"
                    name="hdd"
                    value={form.hdd || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>
              </div>

              {/* GPU + DISPLAY SIZE */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    Graphic Card (GB)
                  </label>
                  <input
                    type="text"
                    name="graphic_card_gb"
                    value={form.graphic_card_gb || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    Display Size
                  </label>
                  <input
                    type="text"
                    name="display_size"
                    value={form.display_size || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>
              </div>

              {/* TOUCH + MS OFFICE */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    Touchscreen
                  </label>
                  <input
                    type="text"
                    name="Touchscreen"
                    value={form.Touchscreen || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white/50 mb-1">
                    MS Office
                  </label>
                  <input
                    type="text"
                    name="msoffice"
                    value={form.msoffice || ""}
                    onChange={handleChange}
                    className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                  />
                </div>
              </div>

              {/* WEIGHT */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-white/50 mb-1">
                  Weight
                </label>
                <input
                  type="text"
                  name="weight"
                  value={form.weight || ""}
                  onChange={handleChange}
                  className="px-2 py-2 bg-white/60 backdrop-blur-2xl text-sm rounded-2xl outline-none"
                />
              </div>

              {/* BUY LINKS */}
              <div className="w-full flex flex-col gap-2">
                <label className="font-semibold text-sm text-white/50">
                  Buy Links
                </label>

                {(form.buyLinks || []).map((link, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full"
                  >
                    <input
                      type="text"
                      value={link.site}
                      placeholder="Site"
                      onChange={(e) =>
                        handleBuyLinksChange(i, "site", e.target.value)
                      }
                      className="p-2 rounded-2xl bg-white/60 backdrop-blur-2xl text-sm outline-none"
                    />

                    <input
                      type="text"
                      value={link.url}
                      placeholder="URL"
                      onChange={(e) =>
                        handleBuyLinksChange(i, "url", e.target.value)
                      }
                      className="p-2 rounded-2xl bg-white/60 backdrop-blur-2xl text-sm outline-none"
                    />
                  </div>
                ))}
              </div>

              {/* IMAGE */}
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm text-white/50">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={form.image || ""}
                  onChange={handleChange}
                  className="bg-white/60 backdrop-blur-2xl p-2 rounded-2xl text-sm outline-none"
                />
              </div>

              <button
                type="submit"
                className="bg-yellow-600 py-2 rounded-3xl w-full cursor-pointer"
              >
                Update
              </button>
            </form>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default ProductUpdate;
