import { Button } from '@mui/material'
import React from 'react'
import SplitScreen from "../components/sample/SplitScreen";
import RegularList from "../components/sample/RegularList";
import SmallListItems from "../components/sample/authors/SmallListItems";
import { authors } from "../data/sample/authors";
import LargeListItems from "../components/sample/authors/LargeListItems";
import Modal from "../components/sample/Modal";
import ResourceLoader from "../components/sample/ResourceLoader";
import CurrentUserLoader from "../components/sample/CurrentUserLoader";
import UserInfo from "../components/sample/UserInfo";
import UserInfoData from "../components/sample/UserInfoData";
import { LOCAL_SERVER_URL } from "../config";


const Sample = () => {
    const leftComponent = () => {
        return (
          <div className="bg-red-500 text-blue-400">
            <h1>Left Component</h1>
          </div>
        );
      };
      const rightComponent = () => {
        return (
          <div className="bg-blue-500 text-red-400">
            <h1>Right Component</h1>
          </div>
        );
      };
  return (
    <>
      <div>
        <SplitScreen Left={leftComponent} Right={rightComponent} />
        <div className="my-4">
          <h2 className="text-red-400">Large List Items</h2>
          <RegularList
            items={authors}
            sourceName={"author"}
            ItemComponent={LargeListItems}
          />
        </div>
        <div className="my-1">
          <h2 className="text-red-400">Small List Items</h2>
          <RegularList
            items={authors}
            sourceName={"author"}
            ItemComponent={SmallListItems}
          />
        </div>
      </div>
      <Modal>
        <LargeListItems author={authors[0]} />
        {/* <LargeListItems {...{['authors']: authors[0]}} /> */}
      </Modal>
      <CurrentUserLoader>
        <UserInfo />
      </CurrentUserLoader>
      <ResourceLoader
        resourceUrl={`${LOCAL_SERVER_URL}/users/2`}
        resourceName={"user"}
      >
        <UserInfo />
      </ResourceLoader>
      <div className="bg-green-400">
        <UserInfoData userId={"3"} />
      </div>
      <div className="bg-green-400"></div>
      <Button variant="contained" color="success">
        Success
      </Button>
    </>
  )
}

export default Sample