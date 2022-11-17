module.exports = {
    css: {
      loaderOptions: {
        sass: {
            additionalData: `
            @import "@/styles/colors.scss";
            @import "@/styles/fonts.scss";
            @import "@/styles/structs.scss";
            @import "@/styles/scrollbar.scss";
            `
        }
      }
    }
  };