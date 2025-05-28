function toggleSection(sectionId, logicType) {
    const input1 = document.getElementById(logicType.toLowerCase() + '1').checked;
    const input2 = document.getElementById(logicType.toLowerCase() + '2').checked;

    let show = false;
    switch (logicType) {
        case 'AND':
            show = input1 && input2;
            break;
        case 'OR':
            show = input1 || input2;
            break;
        case 'NAND':
            show = !(input1 && input2);
            break;
    }

    const section = document.getElementById(sectionId);
    if (show) {
        section.classList.remove('hidden');
    } else {
        section.classList.add('hidden');
    }
}
