import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { db } from "../utils/dbConfig"; 
import { Users, Records } from "../utils/schema"; 
import { eq } from "drizzle-orm";
import { usePrivy } from "@privy-io/react-auth";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const { ready, authenticated, user } = usePrivy();

  const fetchUsers = useCallback(async () => {
    try {
      const result = await db.select().from(Users).execute();
      setUsers(result);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  const fetchUserByEmail = useCallback(async (email) => {
    try {
      const result = await db
        .select()
        .from(Users)
        .where(eq(Users.createdBy, email))
        .execute();
      if (result.length > 0) {
        setCurrentUser(result[0]);
        return result[0];
      }
      return null;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      return null;
    }
  }, []);

  const createUser = useCallback(async (userData) => {
    try {
      const newUser = await db
        .insert(Users)
        .values(userData)
        .returning()
        .execute();
      if (newUser.length > 0) {
        setUsers((prevUsers) => [...prevUsers, newUser[0]]);
        setCurrentUser(newUser[0]);
        return newUser[0];
      }
      return null;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  }, []);

  const fetchUserRecords = useCallback(async (userEmail) => {
    try {
      const result = await db
        .select()
        .from(Records)
        .where(eq(Records.createdBy, userEmail))
        .execute();
      setRecords(result);
    } catch (error) {
      console.error("Error fetching user records:", error);
    }
  }, []);

  const createRecord = useCallback(async (recordData) => {
    try {
      const newRecord = await db
        .insert(Records)
        .values(recordData)
        .returning({ id: Records.id })
        .execute();
      setRecords((prevRecords) => [...prevRecords, newRecord[0]]);
      return newRecord[0];
    } catch (error) {
      console.error("Error creating record:", error);
      return null;
    }
  }, []);

  const updateRecord = useCallback(async (recordData) => {
    try {
      const { documentID, ...dataToUpdate } = recordData;
      console.log(documentID, dataToUpdate);
      return await db
        .update(Records)
        .set(dataToUpdate)
        .where(eq(Records.id, documentID))
        .returning();
    } catch (error) {
      console.error("Error updating record:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    const syncUser = async () => {
      if (!ready) {
        return;
      }

      if (!authenticated || !user?.email?.address) {
        setCurrentUser(null);
        setRecords([]);
        setLoadingUser(false);
        return;
      }

      setLoadingUser(true);
      try {
        const dbUser = await fetchUserByEmail(user.email.address);
        if (dbUser) {
          await fetchUserRecords(user.email.address);
        } else {
          setCurrentUser(null);
          setRecords([]);
        }
      } catch (error) {
        console.error("Error syncing user data:", error);
      } finally {
        setLoadingUser(false);
      }
    };

    syncUser();
  }, [ready, authenticated, user, fetchUserByEmail, fetchUserRecords]);

  return (
    <StateContext.Provider
      value={{
        users,
        records,
        fetchUsers,
        fetchUserByEmail,
        createUser,
        fetchUserRecords,
        createRecord,
        currentUser,
        updateRecord,
        loadingUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);