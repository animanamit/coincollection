import { useRouter } from "next/router";

const SearchQuery = () => {
  const router = useRouter();
  const { searchQuery } = router.query;
  return (
    <div>
      Enter
      {searchQuery}
    </div>
  );
};

export default SearchQuery;
