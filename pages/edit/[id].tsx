import { StarIcon } from "@heroicons/react/outline";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { database, storageRef } from "../../firebase/firebase";

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
  coinId: string;
  dateAdded: string;
};

const Edit = () => {
  const router = useRouter();
  let { id } = router.query;

  const [coin, setCoin] = useState<Inputs>();
  const [rating, setRating] = useState<number>(0);

  const [obs, setObs] = useState<File>();
  const [rev, setRev] = useState<File>();

  const [obs2, setObs2] = useState<File | null>(null);
  const [rev2, setRev2] = useState<File | null>(null);

  useEffect(() => {
    const getCoinData = async () => {
      const q = query(collection(database, "coins"), where("coinId", "==", id));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        setCoin(doc.data() as Inputs);
      });
    };
    if (router.isReady) getCoinData();
  }, [router.isReady]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const fileRefObs = ref(storageRef, `coins/obs-${id}`);
    const fileRefRev = ref(storageRef, `coins/rev-${id}`);

    const fileRefObsRemark = ref(storageRef, `coins/obs_remark-${id}`);
    const fileRefRevRemark = ref(storageRef, `coins/rev_remark-${id}`);

    console.log("got all refs");

    if (obs) {
      await deleteObject(fileRefObs)
        .then(async () => {
          // File deleted successfully
          await uploadBytes(fileRefObs, obs as Blob);
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error);
        });
    }

    if (obs2) {
      // try {
      //   deleteObject(fileRefObsRemark);
      // } catch (error) {
      //   console.log(error);
      // } finally {
      //   // .then(async () => {
      //   // File deleted successfully
      //   console.log("at obs remark");
      //   await uploadBytes(fileRefObsRemark, obs2 as Blob);
      //   // })
      //   // .catch((error) => {
      //   //   // Uh-oh, an error occurred!
      //   //   console.log(error);
      //   // });`
      // }
      console.log("obs2 was added");

      let url = await getDownloadURL(
        ref(storageRef, `coins/obs_remark-${id}`)
      ).catch((error) => {
        console.log("no download url");
        console.log(error);
        return null;
      });

      if (url) {
        console.log("url exists, going to delete");
        await deleteObject(fileRefObsRemark).then(async () => {
          await uploadBytes(fileRefObsRemark, obs2 as Blob);
        });
      } else {
        await uploadBytes(fileRefObsRemark, obs2 as Blob);
      }
    }

    // getDownloadURL(ref(storageRef, `coins/obs_remark-${id}`))
    //   .then(() => {
    //     deleteObject(fileRefObsRemark).then(async () => {
    //       await uploadBytes(fileRefObsRemark, obs2 as Blob);
    //     });
    //   })
    //   .catch(async (error) => {
    //     // A full list of error codes is available at
    //     // https://firebase.google.com/docs/storage/web/handle-errors
    //     switch (error.code) {
    //       case "storage/object-not-found":
    //         // File doesn't exist
    //         console.log("Object was not found");
    //         await uploadBytes(fileRefObsRemark, obs2 as Blob);
    //         break;
    //     }
    //   });

    if (rev) {
      await deleteObject(fileRefRev)
        .then(async () => {
          // File deleted successfully
          await uploadBytes(fileRefRev, rev as Blob);
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error);
        });
    }

    if (rev2) {
      // deleteObject(fileRefRevRemark)
      //   .then(async () => {
      //     // File deleted successfully
      //     console.log("at rev remark");
      //     await uploadBytes(fileRefRevRemark, rev2 as Blob);
      //   })
      //   .catch((error) => {
      //     // Uh-oh, an error occurred!
      //     console.log(error);
      //   });
      console.log("rev2 was added");
      let url = await getDownloadURL(
        ref(storageRef, `coins/rev_remark-${id}`)
      ).catch((error) => {
        console.log(error);
        return null;
      });
      if (url) {
        await deleteObject(fileRefRevRemark).then(async () => {
          await uploadBytes(fileRefRevRemark, rev2 as Blob);
        });
      } else {
        await uploadBytes(fileRefRevRemark, rev2 as Blob);
      }
    }

    let urls = await Promise.all([
      getDownloadURL(ref(storageRef, `coins/obs-${id}`)),
      getDownloadURL(ref(storageRef, `coins/rev-${id}`)),
    ]);

    if (obs2 || coin.url[2]) {
      console.log("getting download link for obs2");
      let url = await getDownloadURL(ref(storageRef, `coins/obs_remark-${id}`));
      urls.push(url);
    }

    if (rev2 || coin.url[3]) {
      console.log("getting download link for rev2");
      let url = await getDownloadURL(ref(storageRef, `coins/rev_remark-${id}`));
      urls.push(url);
    }

    let obj = {
      ...data,
      coinId: coin?.coinId,
      url: urls.length > 0 ? urls : coin?.url,
      dateAdded: coin?.dateAdded,
      rating: rating <= 3 ? rating : 0,
    };

    const updateRef = doc(database, `coins/${id}`);

    await updateDoc(updateRef, {
      ...obj,
    }).then(() => alert("Coin data successfully updated!"));

    // console.log(obj);
    // setDoc(doc(database, "coins", id), obj).then(() =>
    //   console.log("added to firestore!")
    // );
    // reset();
    router.reload();
  };

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
  return (
    <div className="flex flex-col items-center py-4 h-vh bg-slate-50">
      <h2 className="p-4 text-4xl font-bold tracking-tight text-zinc-800">
        Edit Coin Data
      </h2>

      {coin ? (
        <div className="flex flex-col w-2/5 p-8 bg-white shadow-md">
          <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}

            {/* include validation with required or other standard HTML validation rules */}
            <div className="flex flex-col mb-2">
              <label className="mb-1 font-bold text-zinc-800">Ruler</label>
              <input
                defaultValue={coin.name}
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
                defaultValue={coin.type}
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
                defaultValue={coin.class}
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
                defaultValue={coin.variation}
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
                defaultValue={coin.weight}
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
                defaultValue={coin.page}
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
                defaultValue={coin.obs}
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
                defaultValue={coin.rev}
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
                defaultValue={coin.remarks}
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
              placeholder="Update"
            />
          </form>
        </div>
      ) : (
        <h1 className="text-4xl font-bold tracking-tight text-center text-zinc-800">
          Loading...
        </h1>
      )}
    </div>
  );
};

export default Edit;
