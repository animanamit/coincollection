import { useQuery } from "react-query";

const fetchCoinsFromSet = async (setName: string) => {
  try {
    let coinsFromSet = await fetch("/api/getCoinsFromSet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ setName: setName }),
    }).then((res) => res.json());
    console.log(coinsFromSet);
    return coinsFromSet;
  } catch (err) {
    console.log(err);
  }
};

const Priority = () => {
  let { data, isLoading, isError } = useQuery("fetchCoinsFromSet", () =>
    fetchCoinsFromSet("priority")
  );

  if (data) {
    return <h1>Data is here</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return <div>Enter</div>;
};

export default Priority;
