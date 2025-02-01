// plugins/axios.js
import { ethers } from 'ethers';

export default ({ app }, inject) => {
  // Внедрите ethers в контекст приложения
  inject('ethers', ethers);
};