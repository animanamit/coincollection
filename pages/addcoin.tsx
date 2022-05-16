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
};

const AddCoin = () => {
  const [obs, setObs] = useState<File>();
  const [rev, setRev] = useState<File>();

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    <div className="bg-slate-50 h-full flex flex-col items-center py-4">
      <h2 className="tracking-tight text-zinc-800 font-bold text-4xl p-4">
        Add a new coin
      </h2>

      <div className="flex flex-col p-8 shadow-md bg-white w-2/5">
        <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}

          {/* include validation with required or other standard HTML validation rules */}
          <div className="mb-2 flex flex-col">
            <label className="font-bold text-zinc-800 mb-1">Ruler</label>
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
          <div className="mb-2 flex flex-col">
            <label className="font-bold text-zinc-800 mb-1">Type</label>
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
          <div className="mb-2 flex flex-col p-1">
            <label className="font-bold text-zinc-800 mb-1">Class</label>
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
          <div className="mb-2 flex flex-col">
            <label className="font-bold text-zinc-800 mb-1">Variation</label>
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

          <div className="mb-2 flex flex-col">
            <label className="font-bold text-zinc-800 mb-1">Weight</label>
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
          <div className="mb-2 flex flex-col">
            <label className="font-bold text-zinc-800 mb-1">Page</label>
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
          <div className="mb-2 flex flex-col">
            <label className="font-bold text-zinc-800 mb-1">Obs</label>
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
          <div className="mb-2 flex flex-col">
            <label className="font-bold text-zinc-800 mb-1">Rev</label>
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
          <div className="p-1 mb-2">
            <label
              className=" text-zinc-800 font-bold block mb-2"
              htmlFor="user_avatar"
            >
              Upload Obs Photo
            </label>
            <input
              type="file"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              className="text-zinc-600 bg-zinc-200 text-base rounded focus:outline-none focus:border-transparent"
              onChange={handleObs}
            />
          </div>
          <div className="p-1 mb-2">
            <label
              className=" text-zinc-800 font-bold block mb-2"
              htmlFor="user_avatar"
            >
              Upload Rev Photo
            </label>
            <input
              type="file"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              className="text-zinc-600 bg-zinc-200 text-base rounded focus:outline-none focus:border-transparent"
              onChange={handleRev}
            />
          </div>

          <input
            type="submit"
            className="py-2 px-3 shadow-sm  rounded bg-slate-200 uppercase tracking-loose"
          />
        </form>
      </div>
    </div>
  );
};

export default AddCoin;
