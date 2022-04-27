import { useEffect, useState } from "react";

import type { GetServerSideProps } from "next";
import Head from "next/head";
import Layout from "../components/layout";
import type { ReactElement } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabaseClient";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return { props: {}, redirect: { destination: "/" } };
  }
  return { props: { user } };
};

const Profile = ({ user }: { user: User }) => {
  const [username, setUsername] = useState(null);

  return (
    <>
      <div>Username: {username}</div>
    </>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>doto | profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>{page}</Layout>
    </>
  );
};

export default Profile;
