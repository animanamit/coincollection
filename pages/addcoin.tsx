// import { storageRef } from "../firebase/firebase";
// import { collection, addDoc } from "firebase/firestore";
// import { uploadBytes, ref } from "firebase/storage";
import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

const AddCoin = () => {
  const [, setFile] = useState<File>();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const handleFile = (e: React.ChangeEvent) => {
    const target = e.currentTarget as HTMLInputElement;
    const image = (target.files as FileList)[0];
    setFile(image);
  };

  const submit = async () => {
    // try {
    //   const fileRef = ref(storageRef, "coins/example");
    //   console.log("trying to upload");
    //   uploadBytes(fileRef, file).then(() => {
    //     console.log("Uploaded a blob or file!");
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const chooseFile = () => {};

  return (
    <div className="bg-slate-50 h-screen mx-auto">
      <h2 className="tracking-tight text-zinc-800 font-bold text-4xl p-4">
        Add a new coin
      </h2>

      <div className="flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input defaultValue="test" {...register("example")} />

          {/* include validation with required or other standard HTML validation rules */}
          <input {...register("exampleRequired", { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}

          <input type="submit" />
        </form>
      </div>
      <button onClick={chooseFile}>Choose File</button>
      <input type="file" onChange={handleFile} />
      <button className="bg-red-200" onClick={submit}>
        Submit
      </button>
    </div>
  );
};

export default AddCoin;
