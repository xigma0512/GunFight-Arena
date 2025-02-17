abstract class ItemTable {

    static readonly weaponNameTable: Record<number, string> = {
        0: "M4A1",
        1: "AK47",
        2: "Fnfal",
        3: "AK12",
        4: "M249",
        5: "Mossberg",
        6: "AWP",
        7: "MP5a5",

        8: "Deagle",
        9: "Glock17",
        10: "Glock18"
    };

    // [item_id, amount, hotbar_slotId]
    static readonly weapon: Record<number, [string, number, number][]> = {
        // m4a1
        0: [
            ["gabrielaplok:m4a1", 1, 0],
            ["gabrielaplok:m4a1_mag", 10, 8]
        ],
        // ak47
        1: [
            ["gabrielaplok:ak47", 1, 0],
            ["gabrielaplok:ak47_mag", 10, 8]
        ],
        // fnfal
        2: [
            ["gabrielaplok:fnfal", 1, 0],
            ["gabrielaplok:fnfal_mag", 10, 8]
        ],
        // ak12
        3: [
            ["gabrielaplok:ak12", 1, 0],
            ["gabrielaplok:ak12_mag", 10, 8]
        ],
        // m249
        4: [
            ["gabrielaplok:m249", 1, 0],
            ["gabrielaplok:m249_mag", 10, 8]
        ],
        // mossberg
        5: [
            ["gabrielaplok:mossberg", 1, 0],
            ["gabrielaplok:bullet_12gauge", 60, 8]
        ],
        // awp
        6: [
            ["gabrielaplok:awp", 1, 0],
            ["gabrielaplok:awp_mag", 6, 8]
        ],
        // mp5a5
        7: [
            ["gabrielaplok:mp5a5", 1, 0],
            ["gabrielaplok:mp5a5_mag", 10, 8]
        ],
        // deagle
        8: [
            ["gabrielaplok:deagle", 1, 1],
            ["gabrielaplok:deagle_mag", 10, 7]
        ],
        // glock17
        9: [
            ["gabrielaplok:glock17", 1, 1],
            ["gabrielaplok:glock17_mag", 10, 7]
        ],
        // glock18c
        10: [
            ["gabrielaplok:glock18", 1, 1],
            ["gabrielaplok:glock18_mag", 10, 7]
        ],
    }
}
export { ItemTable }