import { getCookie, setCookie } from "./utils";
import { AppThunk } from "../index";
import { fetchUserProfile } from "./actions/profileForm";
import { setAuthChecked, setUser } from "./actions/checkAuth";
import { IIngredient } from "../services/actions/burgerIngredients";

export const api = "https://norma.nomoreparties.space/api";

export interface IApiResponse {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  user?: {
    email: string;
    name: string;
  };
  message?: string;
  data?: IIngredient[];
}

export const checkResponse = async <T = IApiResponse>(
  res: Response
): Promise<T> => {
  const data: T = await res.json();
  if (res.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
};

export const refreshToken =
  (): AppThunk<Promise<boolean>> => async (dispatch) => {
    const token = getCookie("refreshToken");
    try {
      const response = await fetch(`${api}/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });

      const data: IApiResponse = await checkResponse(response);

      if (data && data.success && data.accessToken) {
        setCookie("accessToken", data.accessToken, { expires: 1800 });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error during token refresh: ", error);
      return false;
    }
  };

export const checkUserAuth =
  (): AppThunk<Promise<void>> => async (dispatch) => {
    if (getCookie("accessToken")) {
      try {
        const userProfile = await dispatch(fetchUserProfile());
        dispatch(setUser(userProfile));
      } catch (error) {
        console.error("Error checking user auth: ", error);
      } finally {
        dispatch(setAuthChecked(true));
      }
    } else {
      dispatch(setAuthChecked(true));
    }
  };
