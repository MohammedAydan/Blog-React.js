import React, { useEffect, useState } from "react";
import { useHomeContext } from "../contexts/HomeContext";
import { Link } from "react-router-dom";
import IFCondition from "./IFCondition";
import Loading from "./Loading";
import { useSearchContext } from "../contexts/SearchContext";
import { MediaAccountsPath } from "../MyMethods/MyMethods";
import { MdVerified } from "react-icons/md";
import UserAvater from "./UserAvater";

function SearchBar() {
  const {
    searchUsers,
    usersSearch,
    clearUsersSharch,
    loadingSearch,
    setLoadingSearch,
  } = useSearchContext();
  const [textSearch, setTextSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (textSearch.length == 0) {
      clearUsersSharch();
      setShowMenu(false);
    }
    if (textSearch.length > 0) {
      clearUsersSharch();
      searchUsers(textSearch);
      setShowMenu(true);
    }
  }, [textSearch, setTextSearch]);

  return (
    <div className="p-2 relative w-full max-w-96">
      <input
        onChange={(e) => setTextSearch(e.target.value)}
        // onKeyDown={(e) => setTextSearch(e.target.value)}
        type="text"
        placeholder="Search"
        className="w-full max-w-96 h-10 rounded-lg p-2 bg-slate-800 text-white"
      />

      <IFCondition condition={loadingSearch}>
        <div className="mt-2 absolute w-full max-w-96 rounded-lg p-2 bg-slate-800 text-white right-0 left-0">
          <center className="p-2">
            <Loading />
          </center>
        </div>
      </IFCondition>

      <IFCondition condition={showMenu && Object.keys(usersSearch).length > 0}>
        <div className="mt-2 absolute w-full max-w-96 rounded-lg p-2 bg-slate-800 text-white right-0 left-0">
          <ul>
            {Object.values(usersSearch).map((u) => {
              return (
                <Link
                  key={u.id}
                  to={`/profile/${u.id}`}
                  onClick={clearUsersSharch}
                >
                  <li className="flex felx-row items-center p-1">
                    <UserAvater
                      imgUrl={u?.img_url}
                      user={u}
                      avaterSize="small"
                    />

                    <p className="ml-2">{u.name}</p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </IFCondition>
    </div>
  );
}

export default SearchBar;
