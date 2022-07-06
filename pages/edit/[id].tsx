import { StarIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";
import { supabase } from "../../utils/supabase";

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
};

const getCoinDataToEdit = async (coinId: any) => {
  try {
    let { coinToEdit } = await fetch(`/api/getCoinById`, {
      method: "POST",
      body: JSON.stringify({ coinId: coinId }),
    }).then((res) => res.json());

    return coinToEdit;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const EditCoin = () => {
  const router = useRouter();
  let { id } = router.query;

  const { isLoading, isError, isSuccess, data } = useQuery(
    ["getCoinDataToEdit", id],
    () => getCoinDataToEdit(id),
    { refetchOnWindowFocus: false }
  );

  const [coin, setCoin] = useState<any>();

  const [coinage, setCoinage] = useState("");
  const [rating, setRating] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (data) {
      setRating(data.rating);
      setCoinage(data.coinage);
    }
  }, [data]);

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

  const updateImages = async (coinId: string) => {
    let newImageURLs = [];

    if (obs) {
      console.log("updating oBS");
      if (data.obsPhoto !== "") {
        const { data, error } = await supabase.storage
          .from("coins")
          .update(`coins/obs-${coinId}`, obs);
        if (error) {
          console.log(error);
        }
      } else {
        const { data, error } = await supabase.storage
          .from("coins")
          .upload(`coins/obs-${coinId}`, obs);

        let { publicURL } = await supabase.storage
          .from("coins")
          .getPublicUrl(`coins/obs-${coinId}`);

        console.log(publicURL);
        if (publicURL) {
          newImageURLs[0] = publicURL;
        }
      }
    }

    if (rev) {
      if (data.revPhoto !== "") {
        const { data, error } = await supabase.storage
          .from("coins")
          .update(`coins/rev-${coinId}`, rev);
        if (error) {
          console.log(error);
        }
      } else {
        const { data, error } = await supabase.storage
          .from("coins")
          .upload(`coins/rev-${coinId}`, rev);
        let { publicURL } = await supabase.storage
          .from("coins")
          .getPublicUrl(`coins/rev-${coinId}`);

        console.log(publicURL);
        if (publicURL) {
          newImageURLs[1] = publicURL;
        }
      }
    }

    if (obs2) {
      if (data.obsRemarkPhoto !== "") {
        const { data, error } = await supabase.storage
          .from("coins")
          .update(`coins/obs-remark-${coinId}`, obs2);
        if (error) {
          console.log(error);
        }
      } else {
        const { data, error } = await supabase.storage
          .from("coins")
          .upload(`coins/obs-remark-${coinId}`, obs2);

        let { publicURL } = await supabase.storage
          .from("coins")
          .getPublicUrl(`coins/obs-remark-${coinId}`);

        console.log(publicURL);
        if (publicURL) {
          newImageURLs[2] = publicURL;
        }
      }
    }
    if (rev2) {
      if (data.revRemarkPhoto !== "") {
        const { data, error } = await supabase.storage
          .from("coins")
          .update(`coins/rev-remark-${coinId}`, rev2);
        if (error) {
          console.log(error);
        }
      } else {
        const { data, error } = await supabase.storage
          .from("coins")
          .upload(`coins/rev-remark-${coinId}`, rev2);

        let { publicURL } = await supabase.storage
          .from("coins")
          .getPublicUrl(`coins/rev-remark-${coinId}`);

        console.log(publicURL);
        if (publicURL) {
          newImageURLs[3] = publicURL;
        }
      }
    }

    return newImageURLs;
  };

  const updateData = async (dataObj: any) => {
    await fetch("/api/updateCoin", {
      body: JSON.stringify({ updatedData: dataObj }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  };

  const submitData = async (formData: any) => {
    // console.log(formData);

    // console.log(data);
    let dataObj = {
      coinId: data.coinId,
      id: data.id,
      ruler:
        formData.rule !== undefined && formData.ruler !== ""
          ? formData.ruler
          : data.ruler,
      name:
        formData.name !== undefined && formData.name !== ""
          ? formData.name
          : data.name,
      coinage:
        formData.coinage !== undefined && formData.coinage !== ""
          ? formData.coinage
          : data.coinage,

      period:
        formData.period !== undefined && formData.period !== ""
          ? formData.period
          : data.period,
      type:
        formData.type !== undefined && formData.type !== ""
          ? formData.type
          : data.type,
      year:
        formData.year !== undefined && formData.year !== ""
          ? formData.year
          : data.year,
      class:
        formData.class !== undefined && formData.class !== ""
          ? formData.class
          : data.class,
      denomination:
        formData.denomination !== undefined && formData.denomination !== ""
          ? formData.denomination
          : data.denomination,
      variety:
        formData.variety !== undefined && formData.variety !== ""
          ? formData.variety
          : data.variety,
      catalogueNumber:
        formData.catalogueNumber !== undefined &&
        formData.catalogueNumber !== ""
          ? formData.catalogueNumber
          : data.catalogueNumber,
      weight:
        formData.weight !== undefined && formData.weight !== ""
          ? formData.weight
          : data.weight,
      grade:
        formData.grade !== undefined && formData.grade !== ""
          ? formData.grade
          : data.grade,
      rarity:
        formData.rarity !== undefined && formData.rarity !== ""
          ? formData.rarity
          : data.rarity,
      page:
        formData.page !== undefined && formData.page !== ""
          ? formData.page
          : data.page,
      remarks:
        formData.remarks !== undefined && formData.remarks !== ""
          ? formData.remarks
          : data.remarks,

      obs:
        formData.obs !== undefined && formData.obs !== ""
          ? formData.obs
          : data.obs,
      rev:
        formData.rev !== undefined && formData.rev !== ""
          ? formData.rev
          : data.rev,
      rating: rating > 0 ? String(rating) : data.rating,
      obsPhoto: data.obsPhoto,
      revPhoto: data.revPhoto,
      obsRemarkPhoto: data.obsRemarkPhoto,
      revRemarkPhoto: data.revRemarkPhoto,
    };

    if (obs || rev || obs2 || rev2) {
      console.log("a new image was added");
      toast
        .promise(
          updateImages(String(data.coinId)),
          {
            loading: "Uploading new images, please wait...",
            success: "Images uploaded successfully!",
            error: "Error! Something went wrong.",
          },
          {
            duration: 7000,
          }
        )
        .then((res) => {
          console.log(res);

          dataObj.obsPhoto = res[0] ? res[0] : data.obsPhoto;
          dataObj.revPhoto = res[1] ? res[1] : data.revPhoto;
          dataObj.obsRemarkPhoto = res[2] ? res[2] : data.obsRemarkPhoto;
          dataObj.revRemarkPhoto = res[3] ? res[3] : data.revRemarkPhoto;

          toast
            .promise(
              updateData(dataObj),
              {
                loading: "Uploading new data, please wait...",
                success: "Coin data updated successfully!",
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
        });
    } else {
      toast
        .promise(
          updateData(dataObj),
          {
            loading: "Uploading new data, please wait...",
            success: "Coin data updated successfully!",
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
  };

  if (data) {
    return (
      <div className="px-12">
        <form
          className="px-12 space-y-8 bg-white divide-y divide-gray-200 py-8"
          onSubmit={handleSubmit(submitData)}
        >
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div>
              <h3 className="text-xl font-medium leading-6 text-gray-900">
                Edit Coin Form
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
                    value={coinage}
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
                    placeholder={data.ruler}
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
                        placeholder={data.coinage}
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
                        placeholder={data.year}
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
                        placeholder={data.denomination}
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
                        placeholder={data.catalogueNumber}
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
                        placeholder={data.grade}
                        className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                      />
                    </div>
                  </div>
                </>
              )}

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
                        placeholder={data.type}
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
                        placeholder={data.class}
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
                        placeholder={data.variety}
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
                        placeholder={data.page}
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
                  htmlFor="postal-code"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Rarity
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    {...register("rarity")}
                    placeholder={data.rarity}
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
                    placeholder={data.remarks}
                    rows={3}
                    className="block w-full max-w-lg border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    defaultValue={""}
                  />
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
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="px-12 flex justify-center py-12">
        <h1 className="text-4xl font-semibold tracking-tight">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="mx-12">
      <div className="px-12 flex justify-center py-12">
        <h1 className="text-xl font-semibold tracking-tight">
          An error has occurred, please reload this page.
        </h1>
      </div>
    </div>
  );
};

export default EditCoin;
