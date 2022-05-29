import { database, storageRef } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

type Inputs = {
  name: string;
  class: string;
  obs: string;
  rev: string;
  page: string;
  weight: string;
  variation: string;
  type: string;
  collection: string;
  url?: string;
  remarks: string;
};

const AddCoin = () => {
  const [obs, setObs] = useState<File>();
  const [rev, setRev] = useState<File>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let id = uuidv4();

    const fileRefObs = ref(storageRef, `coins/obs-${id}`);
    const fileRefRev = ref(storageRef, `coins/rev-${id}`);
    if (obs) {
      await uploadBytes(fileRefObs, obs as Blob);
    }

    if (rev) {
      await uploadBytes(fileRefRev, rev as Blob);
    }

    let urls = await Promise.all([
      getDownloadURL(ref(storageRef, `coins/obs-${id}`)),
      getDownloadURL(ref(storageRef, `coins/rev-${id}`)),
    ]);
    let obj = {
      ...data,
      coinId: id,
      url: urls,
      dateAdded: Date(),
    };

    console.log(obj);
    setDoc(doc(database, "coins", id), obj).then(() =>
      console.log("added to firestore!")
    );

    alert("Successfully uploaded!");
    reset();
  };

  const handleObs = (e: React.ChangeEvent) => {
    const target = e.currentTarget as HTMLInputElement;
    const image = (target.files as FileList)[0];
    console.log(target.files);
    setObs(image);
  };

  const handleRev = (e: React.ChangeEvent) => {
    const target = e.currentTarget as HTMLInputElement;
    const image = (target.files as FileList)[0];
    console.log(target.files);
    setRev(image);
  };

  return (
    <div className="flex flex-col items-center h-full py-4 bg-slate-50">
      <h2 className="p-4 text-4xl font-bold tracking-tight text-zinc-800">
        Add a new coin
      </h2>

      <div className="flex flex-col w-2/5 p-8 bg-white shadow-md">
        <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}

          {/* include validation with required or other standard HTML validation rules */}
          <div className="flex flex-col mb-2">
            <label className="mb-1 font-bold text-zinc-800">Ruler</label>
            <input
              // defaultValue="Name"
              type="text"
              className={`py-2 px-3 shadow-sm border rounded focus:outline-none focus:shadow-outline appearance-none text-zinc-600 ${
                errors.name && `border-red-500`
              }`}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex flex-col mb-2">
            <label className="mb-1 font-bold text-zinc-800">Type</label>
            <input
              // defaultValue="Name"
              type="text"
              className={`py-2 px-3 shadow-sm border rounded focus:outline-none focus:shadow-outline appearance-none text-zinc-600 ${
                errors.type && `border-red-500`
              }`}
              {...register("type", { required: true })}
            />
            {errors.type && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex flex-col p-1 mb-2">
            <label className="mb-1 font-bold text-zinc-800">Class</label>
            <input
              // defaultValue="Class"
              type="text"
              className={`py-2 px-3 shadow-sm border rounded focus:outline-none focus:shadow-outline appearance-none text-zinc-600 ${
                errors.class && `border-red-500`
              }`}
              {...register("class", { required: true })}
            />
            {errors.class && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex flex-col mb-2">
            <label className="mb-1 font-bold text-zinc-800">Variation</label>
            <input
              // defaultValue="Name"
              type="text"
              className={`py-2 px-3 shadow-sm border rounded focus:outline-none focus:shadow-outline appearance-none text-zinc-600 ${
                errors.variation && `border-red-500`
              }`}
              {...register("variation", { required: true })}
            />
            {errors.variation && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="flex flex-col mb-2">
            <label className="mb-1 font-bold text-zinc-800">Weight</label>
            <input
              // defaultValue="Name"
              type="text"
              className={`py-2 px-3 shadow-sm border rounded focus:outline-none focus:shadow-outline appearance-none text-zinc-600 ${
                errors.weight && `border-red-500`
              }`}
              {...register("weight", { required: true })}
            />
            {errors.weight && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex flex-col mb-2">
            <label className="mb-1 font-bold text-zinc-800">Page</label>
            <input
              // defaultValue="Name"
              type="text"
              className={`py-2 px-3 shadow-sm border rounded focus:outline-none focus:shadow-outline appearance-none text-zinc-600 ${
                errors.page && `border-red-500`
              }`}
              {...register("page", { required: true })}
            />
            {errors.page && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex flex-col mb-2">
            <label className="mb-1 font-bold text-zinc-800">Obs</label>
            <textarea
              // defaultValue="Name"
              //   type="textarea"
              className={`py-2 px-3 shadow-sm border rounded focus:outline-none focus:shadow-outline appearance-none text-zinc-600 ${
                errors.obs && `border-red-500`
              }`}
              {...register("obs", { required: true })}
            />
            {errors.obs && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex flex-col mb-2">
            <label className="mb-1 font-bold text-zinc-800">Rev</label>
            <textarea
              // defaultValue="Name"
              //   type="text"
              className={`py-2 px-3 shadow-sm border rounded focus:outline-none focus:shadow-outline appearance-none text-zinc-600 ${
                errors.rev && `border-red-500`
              }`}
              {...register("rev", { required: true })}
            />
            {errors.rev && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex flex-col mb-2">
            <label className="mb-1 font-bold text-zinc-800">Remarks</label>
            <textarea
              // defaultValue="Name"
              //   type="text"
              className={`py-2 px-3 shadow-sm border rounded focus:outline-none focus:shadow-outline appearance-none text-zinc-600 ${
                errors.remarks && `border-red-500`
              }`}
              {...register("remarks", { required: true })}
            />
            {errors.remarks && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="p-1 mb-2">
            <label
              className="block mb-2 font-bold text-zinc-800"
              htmlFor="user_avatar"
            >
              Upload Obs Photo
            </label>
            <input
              type="file"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              className="w-full text-base rounded text-zinc-600 bg-zinc-200 focus:outline-none focus:border-transparent"
              onChange={handleObs}
            />
          </div>
          <div className="p-1 mb-2">
            <label
              className="block mb-2 font-bold text-zinc-800"
              htmlFor="user_avatar"
            >
              Upload Rev Photo
            </label>
            <input
              type="file"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              className="w-full text-base rounded text-zinc-600 bg-zinc-200 focus:outline-none focus:border-transparent"
              onChange={handleRev}
            />
          </div>

          <input
            type="submit"
            className="px-3 py-2 uppercase rounded shadow-sm bg-slate-200 tracking-loose"
            placeholder="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default AddCoin;
