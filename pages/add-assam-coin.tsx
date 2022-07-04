import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";

import toast, { Toaster } from "react-hot-toast";
import { supabase } from "../utils/supabase";

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

const AddAssamCoin = () => {
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

  const [coinage, setCoinage] = useState("");

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

  // const uploadImages = () => {

  // }

  const submitData = async (data) => {
    // let coinId = uuidv4();

    console.log(data);

    // let images = [
    //   { name: "obs", file: obs },
    //   { name: "rev", file: rev },
    //   { name: "obs-remark", file: obs2 },
    //   { name: "rev-remark", file: rev2 },
    // ];

    // let urls = [];

    // for (let i = 0; i < images.length; i++) {
    //   if (images[i].file !== undefined) {
    //     const { data, error } = await supabase.storage
    //       .from("coins")
    //       .upload(`coins/${images[i].name}-${coinId}`, images[i].file);

    //     if (error) {
    //       console.log(error);
    //       toast.error("Error uploading image");
    //       return;
    //     } else {
    //       console.log(data);

    //       let { publicURL } = await supabase.storage
    //         .from("coins")
    //         .getPublicUrl(`coins/obs-${coinId}`);

    //       console.log(publicURL);
    //       urls.push(publicURL);
    //     }
    //   }
    // }

    // console.log(urls);

    let dataObj = {
      ...exampleCoin,
      ...data,
      // obsPhoto: urls[0] ? urls[0] : "",
      // revPhoto: urls[1] ? urls[1] : "",
      // obsRemarkPhoto: urls[2] ? urls[2] : "",
      // revRemarkPhoto: urls[3] ? urls[3] : "",
    };

    console.log(dataObj);

    // upload images
    // const { data, error } = await supabase.storage
    //   .from("coins")
    //   .upload(`coins/obs-${coinId}`, obs);

    // if (error) {
    //   console.log(error);
    //   toast.error("Error uploading image");
    //   return;
    // } else {
    //   console.log(data);

    //   let { publicURL } = await supabase.storage
    //     .from("coins")
    //     .getPublicUrl(`coins/obs-${coinId}`);

    //   console.log(publicURL);
    // }

    // let dataObj = {
    //   coinId: coinId,
    //   name: "abc",
    //   coinage: "abc",
    //   ruler: "abc",
    //   period: "abc",
    //   type: "abc",
    //   year: "abc",
    //   class: "abc",
    //   denomination: "abc",
    //   variety: "abc",
    //   catalogueNumber: "abc",
    //   weight: "abc",
    //   grade: "abc",
    //   rarity: "abc",
    //   page: "abc",
    //   remarks: "abc",
    //   rating: "abc",
    //   obs: "abc",
    //   rev: "abc",

    // };

    // toast
    //   .promise(
    //     add(dataObj),
    //     {
    //       loading: "Please wait...",
    //       success: "Data uploaded successfully!",
    //       error: "Error! Something went wrong.",
    //     },
    //     {
    //       duration: 5000,
    //     }
    //   )
    //   .then(() => {
    //     // if (res.success) {
    //     console.log("finished");
    //   });
  };

  return (
    <div className="mx-auto my-30">
      <Toaster />
      <h1>Add Assam Coin</h1>
      <div className="flex flex-col">
        <form className="flex flex-col" onSubmit={handleSubmit(submitData)}>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Coinage
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                placeholder="Select a coinage"
                {...register("coinage")}
                onChange={(e) => setCoinage(e.target.value)}
                className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
              >
                <option selected disabled hidden>
                  Select Coinage
                </option>
                <option>Assam</option>
                <option>Gupta</option>
                <option>British</option>
              </select>
            </div>
          </div>
          <label>Weight</label>
          <input type="text" {...register("weight")} />
          <label>Example pic</label>
          <input type="file" onChange={handleObs} />
          <label>Example pic</label>
          <input type="file" onChange={handleRev} />
          <label>Example pic</label>
          <input type="file" onChange={handleObs2} />
          <label>Example pic</label>
          <input type="file" onChange={handleRev2} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddAssamCoin;
