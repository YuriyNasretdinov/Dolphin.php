/* a program to make thumbnails for Mac OS X >= 10.5 (Leopard) */

/* to compile this, you will need XCode and several frameworks added: ApplicationServices, CoreFoundation and QuickLook */

#include <CoreFoundation/CoreFoundation.h>
#include <ApplicationServices/ApplicationServices.h>
#include <QuickLook/QuickLook.h>
#include <QuickLook/QLThumbnailImage.h>
#include <CoreServices/CoreServices.h>

CFURLRef get_path(const char *path)
{
	return CFURLCreateWithFileSystemPath (NULL,CFStringCreateWithCString (NULL,path,kCFStringEncodingUTF8), kCFURLPOSIXPathStyle, false);
}

int main (int argc, const char * argv[]) {
	CGImageRef final_image;
	CGImageDestinationRef dest;
	
    if(argc != 5)
	{
		printf("Usage: %s source destination width height\n", argv[0]);
		return -1;
	}
	
	final_image = QLThumbnailImageCreate(NULL,get_path(argv[1]), CGSizeMake(atoi(argv[3]), atoi(argv[4])), NULL);
	
	if(final_image == NULL)
	{
		puts("Could not load thumbnail");
		return 1;
	}
	
	dest = CGImageDestinationCreateWithURL(get_path(argv[2]), kUTTypeJPEG, 1, NULL);
	
	if(!dest)
	{
		puts("Could not create destination");
		return 2;
	}
	
	CGImageDestinationAddImage(dest, final_image, NULL);
	
	if(!CGImageDestinationFinalize(dest))
	{
		puts("Could finalize destination\n");
		return 3;
	}
	
    return 0;
}
