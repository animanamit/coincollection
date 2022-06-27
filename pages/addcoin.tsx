import { StarIcon } from "@heroicons/react/outline";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { database, storageRef } from "../firebase/firebase";

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
  rating: number;
  rarity: string;
};

const AddCoin = () => {
  const [obs, setObs] = useState<File>();
  const [rev, setRev] = useState<File>();

  const [obs2, setObs2] = useState<File>();
  const [rev2, setRev2] = useState<File>();
  const [rating, setRating] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let id = uuidv4();
    let urls: string[] = [];
    const fileRefObs = ref(storageRef, `coins/obs-${id}`);
    const fileRefRev = ref(storageRef, `coins/rev-${id}`);

    const fileRefObs2 = ref(storageRef, `coins/obs-remark-${id}`);
    const fileRefRev2 = ref(storageRef, `coins/rev-remark-${id}`);

    if (obs) {
      await uploadBytes(fileRefObs, obs as Blob);
    }

    if (rev) {
      await uploadBytes(fileRefRev, rev as Blob);
    }

    if (obs2) {
      await uploadBytes(fileRefObs2, obs2 as Blob);
    }

    if (rev2) {
      await uploadBytes(fileRefRev2, rev2 as Blob);
    }

    if (obs || rev) {
      urls = await Promise.all([
        getDownloadURL(ref(storageRef, `coins/obs-${id}`)),
        getDownloadURL(ref(storageRef, `coins/rev-${id}`)),
        getDownloadURL(ref(storageRef, `coins/obs-remark-${id}`)),
        getDownloadURL(ref(storageRef, `coins/rev-remark-${id}`)),
      ]);
    }

    // if (obs2 || rev2) {
    //   console.log("getting remark URLs");
    //   urls.concat(
    //     await Promise.all([
    // getDownloadURL(ref(storageRef, `coins/obs-remark-${id}`)),
    //   getDownloadURL(ref(storageRef, `coins/rev-remark-${id}`)),
    //     ])
    //   );
    // }

    console.log(urls);

    let obj = {
      ...data,
      coinId: id,
      url: urls.length > 0 ? urls : [],
      dateAdded: Date(),
      rating: rating <= 3 ? rating : 0,
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

    setObs(image);
  };

  const handleObs2 = (e: React.ChangeEvent) => {
    const target = e.currentTarget as HTMLInputElement;
    const image = (target.files as FileList)[0];
    console.log(target.files);
    setObs2(image);
  };

  const handleRev = (e: React.ChangeEvent) => {
    const target = e.currentTarget as HTMLInputElement;
    const image = (target.files as FileList)[0];
    console.log(target.files);
    setRev(image);
  };

  const handleRev2 = (e: React.ChangeEvent) => {
    const target = e.currentTarget as HTMLInputElement;
    const image = (target.files as FileList)[0];
    console.log(target.files);
    setRev2(image);
  };

  return (
    <div className="flex flex-col items-center h-full py-4 bg-slate-50">
      <h2 className="p-4 text-4xl font-bold tracking-tight text-zinc-800">
        Add a new coin
      </h2>

      <div className="flex flex-col w-2/5 p-8 bg-white shadow-md">
        <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-2">
            <label className="mb-1 font-bold text-zinc-800">Ruler</label>
            <input
              // defaultValue="Name"
              type="text"
              className={`py-2 px-3 shadow-sm border rounded focus:outline-none focus:shadow-outline appearance-none text-zinc-600 ${
                errors.name && `border-red-500`
              }`}
              {...register("name")}
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
              {...register("type")}
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
              {...register("class")}
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
              {...register("variation")}
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
              {...register("weight")}
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
              {...register("page")}
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
              {...register("obs")}
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
              {...register("rev")}
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
              {...register("remarks")}
            />
            {errors.remarks && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex flex-col mb-2">
            <label className="mb-1 font-bold text-zinc-800">Rarity</label>
            <textarea
              // defaultValue="Name"
              //   type="text"
              className={`py-2 px-3 shadow-sm border rounded focus:outline-none focus:shadow-outline appearance-none text-zinc-600 ${
                errors.remarks && `border-red-500`
              }`}
              {...register("rarity")}
            />
            {errors.rarity && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex flex-col mb-2">
            <label className="mb-1 font-bold text-zinc-800">Rating</label>
            <div className="flex">
              <StarIcon
                className={`w-4 h-4  cursor-pointer transition-transform ease-out hover:scale-120 ${
                  rating >= 1 ? "fill-yellow-500" : "hover:fill-yellow-500"
                }`}
                onClick={() => setRating(1)}
              />
              <StarIcon
                className={`w-4 h-4  cursor-pointer transition-transform ease-out hover:scale-120 ${
                  rating >= 2 ? "fill-yellow-500" : "hover:fill-yellow-500"
                }`}
                onClick={() => setRating(2)}
              />
              <StarIcon
                className={`w-4 h-4  cursor-pointer transition-transform ease-out hover:scale-120 ${
                  rating >= 3 ? "fill-yellow-500" : "hover:fill-yellow-500"
                }`}
                onClick={() => setRating(3)}
              />
            </div>
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
          <div className="p-1 mb-2">
            <label
              className="block mb-2 font-bold text-zinc-800"
              htmlFor="user_avatar"
            >
              Upload Obs Remark Photo
            </label>
            <input
              type="file"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              className="w-full text-base rounded text-zinc-600 bg-zinc-200 focus:outline-none focus:border-transparent"
              onChange={handleObs2}
            />
          </div>

          <div className="p-1 mb-2">
            <label
              className="block mb-2 font-bold text-zinc-800"
              htmlFor="user_avatar"
            >
              Upload Rev Remark Photo
            </label>
            <input
              type="file"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              className="w-full text-base rounded text-zinc-600 bg-zinc-200 focus:outline-none focus:border-transparent"
              onChange={handleRev2}
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
