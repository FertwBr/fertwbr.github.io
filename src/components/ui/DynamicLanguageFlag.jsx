import React, {useMemo} from 'react';

/**
 * @param {Object} props
 * @param {string} props.languageCode
 * @param {string} [props.width='40']
 * @returns {JSX.Element}
 */
export default function DynamicLanguageFlag({languageCode, width = '40'}) {
    const flagCode = useMemo(() => {
        let tz = '';
        try {
            tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        } catch (e) {
            tz = '';
        }

        switch (languageCode) {
            case 'es':
                if (tz.includes('Europe/Madrid') || tz.includes('Canary')) return 'es';
                if (tz.includes('Argentina')) return 'ar';
                if (tz.includes('Bogota')) return 'co';
                if (tz.includes('Lima') || tz.includes('Rio_Branco')) return 'pe';
                if (tz.includes('Santiago') || tz.includes('Punta_Arenas')) return 'cl';
                if (tz.includes('Caracas')) return 've';
                if (tz.includes('Guayaquil')) return 'ec';
                if (tz.includes('Guatemala')) return 'gt';
                if (tz.includes('Havana')) return 'cu';
                if (tz.includes('La_Paz') || tz.includes('Porto_Velho')) return 'bo';
                if (tz.includes('Santo_Domingo')) return 'do';
                if (tz.includes('Tegucigalpa')) return 'hn';
                if (tz.includes('Asuncion') || tz.includes('Campo_Grande') || tz.includes('Cuiaba')) return 'py';
                if (tz.includes('El_Salvador')) return 'sv';
                if (tz.includes('Managua')) return 'ni';
                if (tz.includes('Costa_Rica')) return 'cr';
                if (tz.includes('Puerto_Rico')) return 'pr';
                if (tz.includes('Panama')) return 'pa';
                if (tz.includes('Montevideo')) return 'uy';
                if (tz.includes('America/')) return 'mx';
                return 'es';

            case 'pt':
                if (tz.includes('Europe/') || tz.includes('Africa/')) return 'pt';
                return 'br';

            case 'en':
                if (tz.includes('Europe/London') || tz.includes('Europe/Belfast')) return 'gb';
                if (tz.includes('Europe/Dublin')) return 'ie';
                if (tz.includes('Australia/')) return 'au';
                if (tz.includes('Pacific/Auckland') || tz.includes('Pacific/Chatham')) return 'nz';
                if (tz.includes('Africa/Johannesburg')) return 'za';
                if (tz.includes('Asia/Singapore')) return 'sg';
                if (tz.includes('America/Jamaica')) return 'jm';
                if (tz.includes('America/Toronto') ||
                    tz.includes('America/Vancouver') ||
                    tz.includes('America/Edmonton') ||
                    tz.includes('America/Winnipeg') ||
                    tz.includes('America/Halifax') ||
                    tz.includes('America/St_Johns') ||
                    tz.includes('America/Regina')) return 'ca';
                return 'us';

            case 'de':
                if (tz.includes('Vienna')) return 'at';
                if (tz.includes('Zurich')) return 'ch';
                return 'de';

            case 'ja':
                return 'jp';
            case 'hi':
                return 'in';

            default:
                return languageCode;
        }
    }, [languageCode]);

    const calculatedHeight = Math.round(parseInt(width, 10) * 0.75).toString();

    return (
        <img
            src={`https://flagcdn.com/w${width}/${flagCode}.png`}
            alt={`${languageCode} regional flag`}
            width={width}
            height={calculatedHeight}
            style={{
                width: '100%',
                height: 'auto',
                borderRadius: '2px',
                display: 'block',
                boxShadow: '0 0 2px rgba(0,0,0,0.2)'
            }}
        />
    );
}