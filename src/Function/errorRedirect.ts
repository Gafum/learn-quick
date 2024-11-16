function errorRedirect(errorText: string) {
   console.log(errorText);
   window.location.replace("/error");
   throw Error(errorText);
}
export default errorRedirect;
