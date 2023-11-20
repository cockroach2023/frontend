import { atom } from "recoil";

export const titleState = atom({
  key: "titleState",
  default: "",
});

export const adminState = atom({
  key: "adminState",
  default: false
})