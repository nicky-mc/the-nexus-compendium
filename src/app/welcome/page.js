import { currentUser } from "@clerk/nextjs/server";
import { db } from "../utils/dbconnection";
import Link from "next/link";
// TODO Welcome page.
// TODO Explain the purpose of the website.
// TODO Styling
// TODO Make sure that every time an account is created it gets sent to this page.

export default async function LandingPage() {
  const user = await currentUser();
  const username = user.username;
  const userID = user.id;
  const query = await db.query(`SELECT clerk_id FROM users WHERE clerk_id = $1`, [userID]);
  const queryResult = query.rows[0]?.clerk_id;
  if (!queryResult) {
    db.query(`INSERT INTO users(clerk_id, username) VALUES($1, $2)`, [userID, username]);
  }

  return (
    <>
      <p>Hi</p>
      <Link href={`/userProfile/${username}`}>Go edit your profile.</Link>
    </>
  );
}
