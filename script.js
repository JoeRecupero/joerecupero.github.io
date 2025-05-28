function toggleSection(sectionId, logicType) {
    const a = document.getElementById(logicType.toLowerCase() + '1').checked;
    const b = document.getElementById(logicType.toLowerCase() + '2').checked;
    let result = false;

    switch (logicType) {
        case 'AND':
            result = a && b;
            break;
        case 'OR':
            result = a || b;
            break;
        case 'NAND':
            result = !(a && b);
            break;
    }

    const section = document.getElementById(sectionId);
    if (result) {
        section.classList.remove('hidden');
    } else {
        section.classList.add('hidden');
    }
}
