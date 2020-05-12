define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Product = /** @class */ (function () {
        function Product(LotId, LotName, Picture, StartPrice, BuyOutPrice, Info, LotCategory) {
            this.LotId = LotId;
            this.LotName = LotName;
            this.Picture = Picture;
            this.StartPrice = StartPrice;
            this.BuyOutPrice = BuyOutPrice;
            this.Info = Info;
            this.LotCategory = LotCategory;
        }
        return Product;
    }());
    exports.Product = Product;
});
//# sourceMappingURL=mainproducts.js.map