import {
    DiJavascript1,
    DiGitMerge,
    DiDocker,
    DiJava,
    DiPython,
    DiSwift,
    DiRuby,
    DiCode,
} from 'react-icons/di';
import { BsTextLeft, BsHash } from 'react-icons/bs';
import { VscJson } from 'react-icons/vsc';
import { AiOutlineInfoCircle, AiOutlineLock } from 'react-icons/ai';
import { BiFontFamily, BiImageAlt } from 'react-icons/bi';
import { GiHouseKeys } from 'react-icons/gi';

export function type(filepath) {
    return filepath?.split('.').pop().toLowerCase();
}

export function language(type) {
    switch (type) {
        case 'js':
        case 'jsx':
            return 'javascript';
        case 'md':
            return 'markdown';
        case 'rb':
            return 'ruby';
        case 'ts':
        case 'tsx':
            return 'typescript';
        default:
            return type;
    }
}

export function icon(type) {
    switch (type) {
        case 'css':
            return <BsHash className="icon" />;
        case 'dockerfile':
            return <DiDocker className="icon" />;
        case 'gitignore':
            return <DiGitMerge className="icon" />;
        case 'html':
        case 'xml':
        case 'c':
        case 'cc':
        case 'cpp':
        case 'h':
        case 'hh':
        case 'hpp':
            return <DiCode className="icon" />;
        case 'java':
            return <DiJava className="icon" />;
        case 'js':
            return <DiJavascript1 className="icon" />;
        case 'json':
        case 'yml':
            return <VscJson className="icon" />;
        case 'license':
            return <GiHouseKeys className="icon" />;
        case 'lock':
            return <AiOutlineLock className="icon" />;
        case 'md':
            return <AiOutlineInfoCircle className="icon" />;
        case 'py':
            return <DiPython className="icon" />;
        case 'rb':
            return <DiRuby className="icon" />;
        case 'swift':
            return <DiSwift className="icon" />;
        case 'ttf':
            return <BiFontFamily className="icon" />;
        // images
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'webp':
        case 'tiff':
        case 'psd':
        case 'raw':
        case 'bmp':
        case 'heif':
        case 'indd':
        case 'jpeg':
        case 'svg':
        case 'ai':
        case 'eps':
            return <BiImageAlt className="icon" />;
        default:
            return <BsTextLeft className="icon" />;
    }
}
