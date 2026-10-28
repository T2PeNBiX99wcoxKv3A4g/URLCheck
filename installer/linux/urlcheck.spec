# Only the version is filled in by installer/linux/build-rpm.sh; everything else is fixed.
%global debug_package %{nil}
# The published executable is already a self-contained, single-file binary.
%global __os_install_post %{nil}

Name:           urlcheck
Version:        @VERSION@
Release:        1%{?dist}
Summary:        Link intermediary that inspects and cleans a URL before opening it

License:        MIT
URL:            https://github.com/T2PeNBiX99wcoxKv3A4g/URLCheck
Source0:        %{name}-%{version}.tar.gz

BuildArch:      x86_64

# What the self-contained .NET runtime and the embedded Photino browser need at run time.
Requires:       gtk3
Requires:       webkit2gtk4.1
Requires:       libnotify
Requires:       libicu
Requires:       openssl-libs
Requires:       zlib
Requires:       krb5-libs
Requires:       fontconfig
Requires:       freetype

%description
URLCheck takes over your http and https links, shows the address with every
parameter, and lets you strip tracking parameters or switch the scheme before
the link is handed to a real browser.

It also keeps a history of the inspected links and can forward one to another
URLCheck device on the same network.

%prep
%autosetup -n %{name}-%{version}

%install
install -Dpm 0755 URLCheck %{buildroot}/opt/URLCheck/URLCheck
install -Dpm 0644 urlcheck.desktop %{buildroot}%{_datadir}/applications/urlcheck.desktop
install -Dpm 0644 urlcheck.png %{buildroot}%{_datadir}/icons/hicolor/256x256/apps/urlcheck.png

mkdir -p %{buildroot}%{_bindir}
ln -s /opt/URLCheck/URLCheck %{buildroot}%{_bindir}/urlcheck

%post
# The desktop entry and the icon are new; refresh the caches that hold them.
update-desktop-database >/dev/null 2>&1 || :
gtk-update-icon-cache --quiet %{_datadir}/icons/hicolor >/dev/null 2>&1 || :
touch --no-create %{_datadir}/icons/hicolor >/dev/null 2>&1 || :

%postun
update-desktop-database >/dev/null 2>&1 || :
gtk-update-icon-cache --quiet %{_datadir}/icons/hicolor >/dev/null 2>&1 || :
touch --no-create %{_datadir}/icons/hicolor >/dev/null 2>&1 || :

%files
/opt/URLCheck/URLCheck
%{_bindir}/urlcheck
%{_datadir}/applications/urlcheck.desktop
%{_datadir}/icons/hicolor/256x256/apps/urlcheck.png

%changelog
* Tue Oct 28 2026 yukiyosanako <yukiyosanako@users.noreply.github.com> - @VERSION@-1
- Package the published URLCheck build.
