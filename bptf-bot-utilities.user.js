// ==UserScript==
// @name         Backpack.tf - Bot Utilities
// @namespace    https://github.com/Bonfire
// @version      1.0.11
// @description  A script to provide various TF2Autobot utilities on backpack.tf
// @author       Bon
// @downloadURL  https://github.com/Bonfire/bptf-bot-utilities/raw/master/bptf-bot-utilities.user.js
// @updateURL    https://github.com/Bonfire/bptf-bot-utilities/raw/master/bptf-bot-utilities.meta.js
// @include      /^https?:\/\/backpack\.tf\/.*
// @grant        GM_setClipboard
// @require      https://code.jquery.com/jquery-3.5.1.slim.min.js
// @run-at       document-end
// ==/UserScript==

(function () {
  ("use strict");

  // Stock item def index mappings
  const stockMap = new Map();
  stockMap
    .set("0", "190") // Bat
    .set("1", "191") // Bottle
    .set("2", "192") // Fireaxe
    .set("3", "193") // Club
    .set("4", "194") // Knife
    .set("5", "195") // Fists
    .set("6", "196") // Shovel
    .set("7", "197") // Wrench
    .set("8", "198") // Bonesaw
    .set("9", "199") // Shotgun - Engineer (Primary)
    .set("10", "199") // Shotgun - Soldier
    .set("11", "199") // Shotgun - Heavy
    .set("12", "199") // Shotgun - Pyro
    .set("13", "200") // Scattergun
    .set("14", "201") // Sniper Rifle
    .set("15", "202") // Minigun
    .set("16", "203") // SMG
    .set("17", "204") // Syringe Gun
    .set("18", "205") // Rocket Launcher
    .set("19", "206") // Grenade Launcher
    .set("20", "207") // Stickybomb Launcher
    .set("21", "208") // Flamethrower
    .set("22", "209") // Pistol - Engineer
    .set("23", "209") // Pistol - Scout
    .set("24", "210") // Revolver
    .set("25", "737") // Construction PDA
    .set("29", "211") // Medigun
    .set("30", "212") // Invis Watch
    .set("735", "736"); // Sapper

  // Modify popover
  $(document).on("mouseover", ".item", function () {
    let hoveredItem = this;
    let itemElement = $(hoveredItem)[0];

    let popoverLoad = setInterval(function () {
      // Add the "bot utility elements row"
      if ($(hoveredItem).next().hasClass("popover")) {
        if (!$("#bot-utility-elements").length) {
          let botUtilityElements = document.createElement("dd");
          botUtilityElements.className = "popover-btns";
          botUtilityElements.id = "bot-utility-elements";
          $("#popover-search-links")[0].before(botUtilityElements);
        }

        let addUtilitiesLoad = setInterval(function () {
          let itemSKU = itemLookup(itemElement);

          // Add the "<sku>" button
          if (!$("#sku-item-button").length) {
            let skuItemButton = document.createElement("a");
            skuItemButton.id = "sku-item-button";
            skuItemButton.className = "btn btn-default btn-xs";

            let skuIcon = document.createElement("i");
            skuIcon.className = "fa fa-book";

            let itemCommand = `${itemSKU}`;

            $(skuItemButton).data("itemCommand", itemCommand);
            $(skuIcon).data("itemCommand", itemCommand);
            skuItemButton.prepend(skuIcon);
            $("#bot-utility-elements").append(skuItemButton);
          }

          // Add the "Add Item" button
          if (!$("#add-item-button").length) {
            let addItemButton = document.createElement("a");
            addItemButton.id = "add-item-button";
            addItemButton.className = "btn btn-default btn-xs";
            addItemButton.textContent = " Add";

            let plusIcon = document.createElement("i");
            plusIcon.className = "fa fa-plus";

            let itemCommand = `!add sku=${itemSKU}`;

            $(addItemButton).data("itemCommand", itemCommand);
            $(plusIcon).data("itemCommand", itemCommand);
            addItemButton.prepend(plusIcon);
            $("#bot-utility-elements").append(addItemButton);
          }

          // Add the "Update Item" button
          if (!$("#update-item-button").length) {
            let updateItemButton = document.createElement("a");
            updateItemButton.id = "update-item-button";
            updateItemButton.className = "btn btn-default btn-xs";
            updateItemButton.textContent = " Update";

            let editIcon = document.createElement("i");
            editIcon.className = "fa fa-edit";

            let itemCommand = `!update sku=${itemSKU}`;
            $(updateItemButton).data("itemCommand", itemCommand);
            $(editIcon).data("itemCommand", itemCommand);

            updateItemButton.prepend(editIcon);
            $("#bot-utility-elements").append(updateItemButton);
          }

          // Add the "Remove Item" button
          if (!$("#remove-item-button").length) {
            let removeItemButton = document.createElement("a");
            removeItemButton.id = "remove-item-button";
            removeItemButton.className = "btn btn-default btn-xs";
            removeItemButton.textContent = " Remove";

            let minusIcon = document.createElement("i");
            minusIcon.className = "fa fa-minus";

            let itemCommand = `!remove sku=${itemSKU}`;
            $(removeItemButton).data("itemCommand", itemCommand);
            $(minusIcon).data("itemCommand", itemCommand);

            removeItemButton.prepend(minusIcon);
            $("#bot-utility-elements").append(removeItemButton);
          }

          // Add the "Pricecheck Item" button
          if (!$("#pricecheck-item-button").length) {
            let pricecheckItemButton = document.createElement("a");
            pricecheckItemButton.id = "pricecheck-item-button";
            pricecheckItemButton.className = "btn btn-default btn-xs";
            pricecheckItemButton.textContent = " PC";

            let priceIcon = document.createElement("i");
            priceIcon.className = "fa fa-tags";

            let itemCommand = `!pricecheck sku=${itemSKU}`;
            $(pricecheckItemButton).data("itemCommand", itemCommand);
            $(priceIcon).data("itemCommand", itemCommand);

            pricecheckItemButton.prepend(priceIcon);
            $("#bot-utility-elements").append(pricecheckItemButton);
          }

          $("#sku-item-button").on("click", (event) => {
            GM_setClipboard($(event.target).data("itemCommand"), "text/plain");
          });

          $("#add-item-button").on("click", (event) => {
            GM_setClipboard($(event.target).data("itemCommand"), "text/plain");
          });

          $("#update-item-button").on("click", (event) => {
            GM_setClipboard($(event.target).data("itemCommand"), "text/plain");
          });

          $("#remove-item-button").on("click", (event) => {
            GM_setClipboard($(event.target).data("itemCommand"), "text/plain");
          });

          $("#pricecheck-item-button").on("click", (event) => {
            GM_setClipboard($(event.target).data("itemCommand"), "text/plain");
          });

          clearInterval(addUtilitiesLoad);
        }, 50);

        setTimeout(function () {
          clearInterval(addUtilitiesLoad);
        }, 1000);

        clearInterval(popoverLoad);
      }
    }, 50);

    setTimeout(function () {
      clearInterval(popoverLoad);
    }, 750);
  });

  function itemLookup(itemElement) {
    let item = $(itemElement);

    let tempDefIndex = item.attr("data-defindex");
    let itemName = item.attr("data-original-title")
    let itemDefIndex = stockMap.has(tempDefIndex)
      ? stockMap.get(tempDefIndex)
      : tempDefIndex;

    let itemQuality = item.attr("data-quality");
    let isUncraftable = item.attr("data-craftable") !== "1";
    let itemEffectID = item.attr("data-effect_id");

    let itemSkinInfo = item.find(".item-icon");
    let itemWear, itemSkin;
    if (itemSkinInfo.length > 0) {
      itemSkinInfo = itemSkinInfo
        .css("background-image")
        .match(/warpaint\/[(?!_)\S]+_[0-9]+_[0-9]+_[0-9]+\.png/g);
      if (itemSkinInfo !== null) {
        itemSkin = itemSkinInfo[0].split("_")[1];
        itemWear = itemSkinInfo[0].split("_")[2];
      }
    }

    let isStrange = item.attr("data-quality_elevated") === "11";
    let itemKillstreak = item.attr("data-ks_tier");
    let isFestivized =
      item.attr("data-original-title")?.toLowerCase().indexOf("festivized") !==
      -1;
    let isAustralium = item.attr("data-australium") === "1";

    // Other item attributes
    let crateSeries = item.attr("data-crate");
    let itemTarget, itemOutput, itemOutputQuality;
    const priceIndex = item.attr("data-priceindex").split("-");
    if (priceIndex[0] !== "0") {
      switch (item.attr("data-base_name")) {
        case "Chemistry Set":
          // Only change defindex if it's a buy listing or it's the item on the stats page.
          // So it won't change anything if it's from someones inventory or a sell listing.
          if (!item.attr("data-original_id")) {
              if (itemName.includes("Festive")) itemDefIndex = "20007";
              else if (itemName.includes("Collector's")) itemDefIndex = "20006";
              // Unsure about this one couldn't find any items might be unused.
              else if (itemName.includes("Strange")) itemDefIndex = "20008";
              // Assume all strangifier's are series 2 which they are definetly not :(
              // Used series 2 since it's the one with the biggest volume (Don't quote me on that).
              // Available defindexes; Series 1: 20000, Series 1 Rare: 20001, Series 2: 20005, Series 3: 20009.
              else if (itemName.includes("Strangifier")) itemDefIndex = "20005";
          }
        case "Fabricator":
          [itemOutput, itemOutputQuality, itemTarget] = priceIndex;
          break;
        case "Kit":
          itemTarget = priceIndex[1];
          break;
        case "Strangifier":
        case "Unusualifier":
          itemTarget = priceIndex[0];
      }
    }
    if (itemDefIndex == "9536") {
      itemDefIndex =
        (Math.floor(itemSkin / 100) % 2 === 0 ? "17" : "16") + itemSkin;
    }
    // Get the full item SKU, and be sure to remove any pesky whitespaces
    let itemSKU = `${itemDefIndex};\
    ${itemQuality}\
    ${itemEffectID ? `;u${itemEffectID}` : ""}\    
    ${isAustralium ? ";australium" : ""}\
    ${isUncraftable ? ";uncraftable" : ""}\
    ${itemSkinInfo ? `;w${itemWear};pk${itemSkin}` : ""}\
    ${isStrange ? ";strange" : ""}\
    ${itemKillstreak ? `;kt-${itemKillstreak}` : ""}\
    ${itemTarget ? `;td-${itemTarget}` : ""}\
    ${isFestivized ? ";festive" : ""}\
    ${crateSeries ? `;c${crateSeries}` : ""}\
    ${itemOutput ? `;od-${itemOutput}` : ""}\
    ${itemOutputQuality ? `;oq-${itemOutputQuality}` : ""}`;

    return itemSKU.replace(/\s/g, "");
  }
})();
