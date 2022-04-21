import {
	green, red, cyan, magenta,
} from 'kolorist';
import { fsExists } from '../utils/fs-exists';
import { symlinkPackage } from './symlink-package';

export async function linkPackage(
	packagePath: string,
) {
	const pathExists = await fsExists(packagePath);

	if (!pathExists) {
		console.warn(red('✖'), `Package path does not exist: ${packagePath}`);
		process.exitCode = 1;
		return;
	}

	try {
		const link = await symlinkPackage(packagePath);
		console.log(green('✔'), `Symlinked ${magenta(link.name)}:`, cyan(link.path), '→', cyan(packagePath));
		return link;
	} catch (error) {
		console.warn(red('✖'), 'Failed to symlink', cyan(packagePath), 'with error:', (error as any).message);
		process.exitCode = 1;
	}
}