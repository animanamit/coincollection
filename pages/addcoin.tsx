import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";

import toast, { Toaster } from "react-hot-toast";
import { supabase } from "../utils/supabase";

import { StarIcon } from "@heroicons/react/outline";

const exampleCoin = {
  name: "",
  coinage: "",
  ruler: "",
  period: "",
  type: "",
  year: "",
  class: "",
  denomination: "",
  variety: "",
  catalogueNumber: "",
  weight: "",
  grade: "",
  rarity: "",
  page: "",
  remarks: "",
  rating: "",
  obs: "",
  rev: "",
  obsPhoto: "",
  revPhoto: "",
  obsRemarkPhoto: "",
  revRemarkPhoto: "",
  status: "",
  sequenceNumber: "",
};

const AddCoin = () => {
  const [coinage, setCoinage] = useState("");
  const [rating, setRating] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [obs, setObs] = useState<File>();

  const [rev, setRev] = useState<File>();

  const [obs2, setObs2] = useState<File>();
  const [rev2, setRev2] = useState<File>();

  const [urls, setUrls] = useState<string[]>([]);

  const [coinId, setCoinId] = useState<string | null>("");

  const handleObs = (e: React.ChangeEvent) => {
    const target = e.currentTarget as HTMLInputElement;
    const image = (target.files as FileList)[0];

    setObs(image);
  };

  const handleObs2 = (e: React.ChangeEvent) => {
    const target = e.currentTarget as HTMLInputElement;
    const image = (target.files as FileList)[0];
    setObs2(image);
  };

  const handleRev = (e: React.ChangeEvent) => {
    const target = e.currentTarget as HTMLInputElement;
    const image = (target.files as FileList)[0];
    setRev(image);
  };

  const handleRev2 = (e: React.ChangeEvent) => {
    const target = e.currentTarget as HTMLInputElement;
    const image = (target.files as FileList)[0];
    setRev2(image);
  };

  const add = async (dataObj: any) => {
    await fetch("/api/addCoin", {
      body: JSON.stringify(dataObj),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  };

  const addImages = async () => {
    let coinId = uuidv4();
    setCoinId(coinId);

    let images = [
      { name: "obs", file: obs },
      { name: "rev", file: rev },
      { name: "obs-remark", file: obs2 },
      { name: "rev-remark", file: rev2 },
    ];

    let urls: Array<string> = [];

    for (let i = 0; i < images.length; i++) {
      if (images[i].file instanceof File) {
        const { data, error } = await supabase.storage
          .from("coins")
          .upload(`coins/${images[i].name}-${coinId}`, images[i].file as File);

        if (error) {
          console.log(error);
          toast.error("Error uploading image");
          return;
        } else {
          console.log(data);

          let { publicURL } = await supabase.storage
            .from("coins")
            .getPublicUrl(`coins/${images[i].name}-${coinId}`);

          console.log(publicURL);
          if (publicURL) {
            urls.push(publicURL);
          }
        }
      }
    }

    setUrls(urls);
    return { imageURLs: urls, coinId: coinId };
  };

  const submitData = async (data: any) => {
    toast
      .promise(
        addImages(),
        {
          loading: "Uploading images, please wait...",
          success: "Images uploaded successfully!",
          error: "Error! Something went wrong.",
        },
        {
          duration: 7000,
        }
      )
      .then((res) => {
        console.log(res);
        // if (res.success) {
        if (res) {
          let dataObj = {
            ...exampleCoin,
            ...data,
            coinId: res.coinId,
            rating: rating > 0 ? String(rating) : "",
            obsPhoto: res.imageURLs[0] ? res.imageURLs[0] : "",
            revPhoto: res.imageURLs[1] ? res.imageURLs[1] : "",
            obsRemarkPhoto: res.imageURLs[2] ? res.imageURLs[2] : "",
            revRemarkPhoto: res.imageURLs[3] ? res.imageURLs[3] : "",
          };

          toast
            .promise(
              add(dataObj),
              {
                loading: "Uploading data, please wait...",
                success: "Coin uploaded successfully!",
                error: "Error! Something went wrong.",
              },
              {
                duration: 5000,
              }
            )
            .then(() => {
              // if (res.success) {
              console.log("finished");
            });
        }
      });
  };

  return (
    <>
      <form
        className="px-12 space-y-8 bg-white divide-y divide-gray-200 py-8"
        onSubmit={handleSubmit(submitData)}
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <h3 className="text-xl font-medium leading-6 text-gray-900">
              New Coin Form
            </h3>
            {/* <p className="max-w-2xl mt-1 text-sm text-gray-500">
            This information will be displayed publicly so be careful what you
            share.
          </p> */}
          </div>

          <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="coinage"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Coinage
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select
                  id="coinage"
                  // autoComplete="country-name"
                  {...register("coinage")}
                  defaultValue="Select Coinage"
                  onChange={(e) => setCoinage(e.target.value)}
                  className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                >
                  <option disabled>Select Coinage</option>
                  <option>Assam</option>
                  <option>Gupta</option>
                  <option>British Gold</option>
                  <option>British Circulation Rarities</option>
                  <option>Awadh Gold</option>
                  <option>Hyderabad Gold</option>
                  <option>Baroda Gold</option>
                  <option>Mughal Gold</option>
                  <option>Kutch Gold</option>
                  <option>Nawanagar Gold</option>
                  <option>Rajkot</option>
                  <option>Tripura</option>
                  <option>Bengal Presidency</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Details
            </h3>
            <p className="max-w-2xl mt-1 text-sm text-gray-500">
              Fill in details of the new coin.
            </p>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="ruler"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Ruler
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  {...register("ruler")}
                  className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            {coinage !== "Gupta" && coinage !== "Tripura" && (
              <>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="period"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Period
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      {...register("period")}
                      className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="year"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Year
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      {...register("year")}
                      className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="denomination"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Denomination
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      {...register("denomination")}
                      className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="catalogno"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Catalog No.
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      {...register("catalogueNumber")}
                      className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Grade
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      {...register("grade")}
                      className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                    />
                  </div>
                </div>
              </>
            )}
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="sequenceno"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Sequence No.
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  {...register("sequenceNumber")}
                  className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            {(coinage === "Gupta" || coinage === "Tripura") && (
              <>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Type
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      {...register("type")}
                      className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Class
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      {...register("class")}
                      className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Variation
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      {...register("variety")}
                      className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Page
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      {...register("page")}
                      className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Rating
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2 flex">
                    <StarIcon
                      className={`w-4 h-4  cursor-pointer transition-transform ease-out hover:scale-120 ${
                        rating >= 1
                          ? "fill-yellow-500"
                          : "hover:fill-yellow-500"
                      }`}
                      onClick={() => setRating(1)}
                    />
                    <StarIcon
                      className={`w-4 h-4  cursor-pointer transition-transform ease-out hover:scale-120 ${
                        rating >= 2
                          ? "fill-yellow-500"
                          : "hover:fill-yellow-500"
                      }`}
                      onClick={() => setRating(2)}
                    />
                    <StarIcon
                      className={`w-4 h-4  cursor-pointer transition-transform ease-out hover:scale-120 ${
                        rating >= 3
                          ? "fill-yellow-500"
                          : "hover:fill-yellow-500"
                      }`}
                      onClick={() => setRating(3)}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="ruler"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Weight
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  {...register("weight")}
                  className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Rarity
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  {...register("rarity")}
                  className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Obs Description
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  {...register("obs")}
                  className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Rev Description
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  {...register("rev")}
                  className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Remarks
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  {...register("remarks")}
                  rows={3}
                  className="block w-full max-w-lg border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  defaultValue={""}
                />
              </div>
            </div>

            <div className="pt-6 sm:pt-5">
              <div role="group" aria-labelledby="label-notifications">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                  <div>
                    <div
                      className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                      id="label-notifications"
                    >
                      Status
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="max-w-lg">
                      {/* <p className="text-sm text-gray-500">
                        These are delivered via SMS to your mobile phone.
                      </p> */}
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            {...register("status")}
                            type="radio"
                            value="owned"
                            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                          />
                          <label className="block ml-3 text-sm font-medium text-gray-700">
                            Owned
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            {...register("status")}
                            type="radio"
                            value="wishlist"
                            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="push-email"
                            className="block ml-3 text-sm font-medium text-gray-700"
                          >
                            Wishlist
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Photos
            </h3>
            <p className="max-w-2xl mt-1 text-sm text-gray-500">
              Add photos of the coin to be uploaded here.
            </p>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Obs Photo
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <div className="flex justify-center max-w-lg px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        onChange={handleObs}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {obs ? obs.name : "PNG, JPG, GIF up to 10MB"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Rev photo
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <div className="flex justify-center max-w-lg px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        onChange={handleRev}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {rev ? rev.name : "PNG, JPG, GIF up to 10MB"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Obs Remark Photo
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <div className="flex justify-center max-w-lg px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600 text-center justify-center">
                    <label className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        onChange={handleObs2}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 w-full overflow-x-hidden">
                    {obs2 ? obs2.name : "PNG, JPG, GIF up to 10MB"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Rev Remark Photo
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <div className="flex justify-center max-w-lg px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        onChange={handleRev2}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {rev2 ? rev2.name : "PNG, JPG, GIF up to 10MB"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTONS  */}
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                reset();
                setObs(undefined);
                setObs2(undefined);
                setRev(undefined);
                setRev2(undefined);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default AddCoin;
