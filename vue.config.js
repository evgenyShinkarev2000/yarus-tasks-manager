module.exports = {
    css: {
      loaderOptions: {
        sass: {
            additionalData: `
            @import "@/styles/colors.scss";
            @import "@/styles/fonts.scss";
            `
        }
      }
    }
  };