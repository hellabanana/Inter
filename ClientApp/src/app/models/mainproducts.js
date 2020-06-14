define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Product = /** @class */ (function () {
        function Product(lotId, Name, FileID, startPrice, buyOutPrice, info, lotCategory, owner, buyer, dateEnd, dateStart, state) {
            this.lotId = lotId;
            this.Name = Name;
            this.FileID = FileID;
            this.startPrice = startPrice;
            this.buyOutPrice = buyOutPrice;
            this.info = info;
            this.lotCategory = lotCategory;
            this.owner = owner;
            this.buyer = buyer;
            this.dateEnd = dateEnd;
            this.dateStart = dateStart;
            this.state = state;
        }
        return Product;
    }());
    exports.Product = Product;
});
//# sourceMappingURL=mainproducts.js.map